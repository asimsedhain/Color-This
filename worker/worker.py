import tensorflow as tf
import redis
import cv2 as cv
import numpy as np
import pymongo
import os
from bson.objectid import ObjectId
import time
from datetime import datetime
import json
import traceback
from utils import processing

list_name = os.getenv("list_name")
DB_URI = os.getenv("DBURI")
DB_NAME = os.getenv("dbname")
DB_COLLECTION = os.getenv("collection")



print(f"{datetime.now()}: Connecting to Database", flush=True)
client = pymongo.MongoClient(DB_URI)
print(f"{datetime.now()}: Connected to Database", flush=True)

print(f"{datetime.now()}: Loading the Model", flush=True)
generator = tf.keras.models.load_model("./color_generator_100.h5")
print(f"{datetime.now()}: Model Loaded", flush=True)


print(f"{datetime.now()}: Connecting to Queue", flush=True)
redis_client = redis.Redis(host = 'redis', port=6379)
print(f"{datetime.now()}: Connected to Queue", flush=True)


def updateDocument(post_id,original_buffer, color_buffer):
	result = client[DB_NAME][DB_COLLECTION].update_one({'_id': ObjectId(post_id)}, {'$set': {"original":original_buffer, 'color':color_buffer}})
	return result


while(True):
	message = redis_client.rpop(list_name)

	if(message):
		# getting the message and message id
		message = json.loads(message)
		post_id = ObjectId(message["id"])

		# processing the image
		# if there is an error, it will pass an black image 
		try:
			final_image, original_resized_image = processing(generator, message)		
		except Exception as error:
			traceback.print_exc()
			final_image, original_resized_image = np.zeros((256, 256)), np.zeros((256, 256))

		# Updating the database
		is_success, color_image_buffer = cv.imencode(".jpg", final_image)
		is_success, original_resized_image_buffer = cv.imencode(".jpg", original_resized_image)
		result = updateDocument(post_id, original_resized_image_buffer.tostring(), color_image_buffer.tostring())

		print(f"{datetime.now()}: Inserted into the database: {str(post_id)}", flush=True)

	time.sleep(0.001)

