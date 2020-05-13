import tensorflow as tf
import cv2 as cv
import numpy as np



# This preprocesses any image so it can be passed into the model
def preprocessor(img):
	if(len(img.shape)<3):
		temp_img = cv.cvtColor(img, cv.COLOR_GRAY2BGR)
	else:
		temp_img=img
		
	temp_img = cv.cvtColor(temp_img, cv.COLOR_BGR2LAB)
	temp_img = temp_img.astype(np.float32)
	temp_img = ((temp_img/127.5)-1)
	temp_img_128 = cv.resize(temp_img, (128, 128))
	temp_img_256 = cv.resize(temp_img, (256, 256))
	training_data = np.reshape(temp_img_128[:, :, 0], (1, 128, 128, 1))
	output_data = np.reshape(temp_img_256[:, :, 0], (1, 256, 256, 1))
	original_resized_image = cv.resize(img, (256, 256))

	return training_data, output_data, original_resized_image


# This postprocesses the out of the model so it can stroed in the database
def postprocessor(p_img, g_img):
	generated_images = tf.image.resize(g_img, (256,256), tf.image.ResizeMethod.BICUBIC)
	generated_images = tf.concat([p_img,generated_images],3) 
	generated_images = tf.multiply(tf.add(generated_images, 1), 127.5)
	generated_images = generated_images.numpy()
	generated_images = [cv.cvtColor(i, cv.COLOR_LAB2BGR) for i in generated_images.astype(np.uint8)]
	return generated_images[0]

def processing(generator, message):
	# decode the image
	original_image = cv.imdecode(np.frombuffer(bytes(message["original"]["data"]), np.uint8), -1)

	# preprocess the image
	preprocessed_image, post_image, original_resized_image = preprocessor(original_image)
	
	# generate an output from the image
	generated_image = generator(preprocessed_image)

	# post process the output
	final_image = postprocessor(post_image, generated_image)

	return final_image, original_resized_image

