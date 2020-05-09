import tensorflow as tf
import redis
import cv2 as cv
import numpy as np
import pymongo
import os
from bson.objectid import ObjectId
import time
import base64
from datetime import datetime



client = pymongo.MongoClient(os.getenv("DBURI"))
print(f"{datetime.now()}: Connected to Database", flush=True)
generator = tf.keras.models.load_model("./color_generator_170.h5")


redis_client = redis.Redis(host = 'redis', port=6379)
list_name = os.getenv("list_name")


print(f"{datetime.now()}: Connected to Queue", flush=True)

def getDocument(post_id):
	# Convert from string to ObjectId:
	document = client[os.getenv("dbname")][os.getenv("collection")].find_one({'_id': ObjectId(post_id)})
	return document
def updateDocument(post_id, buffer):
	result = client[os.getenv("dbname")][os.getenv("collection")].update_one({'_id': ObjectId(post_id)}, {'$set': {'color':buffer}})
	return result

# This preprocesses any image so it can be passed into the model
def preprocessor(img):
	# resized_image = cv.resize(img, (128, 128))
	temp_img = cv.cvtColor(img, cv.COLOR_BGR2LAB)
	temp_img = temp_img.astype(np.float32)
	temp_img = ((temp_img/127.5)-1)
	temp_img_128 = cv.resize(temp_img, (128, 128))
	temp_img_256 = cv.resize(temp_img, (256, 256))
	training_data = np.reshape(temp_img_128[:, :, 0], (1, 128, 128, 1))
	output_data = np.reshape(temp_img_256[:, :, 0], (1, 256, 256, 1))

	return training_data, output_data


# This postprocesses the out of the model so it can stroed in the database
def postprocessor(p_img, g_img):
	generated_images = tf.image.resize(g_img, (256,256), tf.image.ResizeMethod.BICUBIC)
	generated_images = tf.concat([p_img,generated_images],3) 
	generated_images = tf.multiply(tf.add(generated_images, 1), 127.5)
	generated_images = generated_images.numpy()
	generated_images = [cv.cvtColor(i, cv.COLOR_LAB2BGR) for i in generated_images.astype(np.uint8)]
	return generated_images[0]


while(True):
	message = redis_client.rpop(list_name)
	
	if(message):

		post_id = ObjectId(message.decode("utf-8"))
		# get the document from the database
		document = getDocument(post_id)

		# decode the image
		original_image = cv.imdecode(np.frombuffer(document["buffer"], np.uint8), -1)

		# preprocess the image
		preprocessed_image, post_image = preprocessor(original_image)
		
		# generate an output from the image
		generated_image = generator(preprocessed_image)

		# post process the output
		final_image = postprocessor(post_image, generated_image)
		
		# Updating the database
		is_success, buffer = cv.imencode(".jpg", final_image)
		result = updateDocument(post_id, buffer.tostring())
		print(f"{datetime.now()}: Inserted into the database: {str(post_id)}", flush=True)

	time.sleep(0.001)

