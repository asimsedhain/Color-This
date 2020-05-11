#!/bin/bash


# Bash script for building docker images quickly
# params: app | worker | null
# to specify the appropriate folder.
# null will build both

if [[ $1 == "app" ]]
then
		echo "building app..."
		docker build ./app/ -t color_this:1.0
elif [[ $1 == "worker" ]]
then
		echo "building worker..."
		docker build ./worker/ -t worker:1.0
else
		echo "building app and worker..."
		docker build ./app/ -t color_this:1.0
		docker build ./worker/ -t worker:1.0
fi
