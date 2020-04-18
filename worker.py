# import tensorflow as tf
import redis
# import cv2 as cv
# import numpy as np
import pymongo
# from dotenv import load_dotenv
# load_dotenv()
import os
from bson.objectid import ObjectId
import time

client = pymongo.MongoClient(os.getenv("DBURI"))
print("Connected to Database")
# print(os.getenv("DBURI"))

red = redis.Redis()
sub = red.pubsub()

sub.subscribe("processing")
sub.get_message()
# print(sub.get_mess)
def getDocument(post_id):
	# Convert from string to ObjectId:
	document = client[os.getenv("dbname")][os.getenv("collection")].find_one({'_id': ObjectId(post_id)})
	return document

while(True):
	message = sub.get_message()
	# if(message):
		# print(message["data"])
		# print(f"{message['data']}")
		# print(getDocument(ObjectId(f"{message['data']}")))
	time.sleep(0.001)



print()

