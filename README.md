# [Color This](http://color-this.eastus.cloudapp.azure.com/)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/asimsedhain/Color-This/graphs/commit-activity)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://color-this.eastus.cloudapp.azure.com/)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](/)


![screen_shot.jpg](screen_shot.jpg)

Web Application for Image Colorization using Deep Generative Adversarial Network.

## [Demo](http://color-this.eastus.cloudapp.azure.com/)

The site is hosted [here](http://color-this.eastus.cloudapp.azure.com/).

## [Model](https://github.com/asimsedhain/Image-Colorization-GAN)

The colorization model is based off of this [paper](https://richzhang.github.io/ideepcolor/).
You can learn more about our training process by heading over to the model repo [here](https://github.com/asimsedhain/Image-Colorization-GAN).

Currenlty our model has the following features:
* 128x128 Image resolution (Advisable to resize your image for improved quality)
* Automatic Colorization
* Great for animal images
* Suffers when there are structures in the image

## Usage

The API can be accessed using the http://color-this.eastus.cloudapp.azure.com/upload/ endpoint.

|Type | Endpoint | Description |
|---|---|---|
| POST | `/` | endpoint for uploading the image data. A form data should be passed with the name `original` |
| GET | `/IMAGE_TYPE/ID` | returns the image for the specified `ID`. The `IMAGE_TYPE` should be either `orignal` or `color` for the specific image. It will send a 404 status code if the image is still being processed|

### Examples with JavaScript

### POST `/`
```javascript

// Creating a new form object and passing it using a POST request.

const data = new FormData()
data.append('Original', element.target.files[0])
const response = await fetch('http://color-this.eastus.cloudapp.azure.com/upload/', {
	method: 'POST',
	body: data
	});

// Receiving the IMAGE_ID from the response
const imageId = (await response.json()).imageId;			

```

### GET `/IMAGE_TYPE/ID`
```javascript

<IMG src="http://color-this.eastus.cloudapp.azure.com/upload/IMAGE_TYPE/ID" />

```

## System Architecture
![system_architecture.jpg](system_architecture.jpg)

Our system follows a simple producer-consumer model. Static files and file uploads are handled by a Node server. When a file is uploaded, the Node server uploads the image metadata to the MongoDB and returns an image ID to the client. The client can use the image ID to retrieve the final image after it has been processed. The Node server also pushes the actual image file to the Redis queue for further processing. On the other end, a Python worker is listening for jobs from the Redis queue. When there a job arrives, the worker processes the job and uploads the processed image to the MongoDB. The client can then retrieve the final image by using the image ID. 

## TODO
- [x] Improve UI
- [x] Change queue to get the whole image
- [ ] Add User Interaction
- [x] Add Documentation
- [x] Refactor
- [x] Skin Discoloration
- [ ] Move to HTTPS
- [ ] Deploy to Azure Kubernetes
