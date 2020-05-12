# Color This

![screen_shot.jpg](screen_shot.jpg)

Web Application for Image Colorization using Deep Generative Adversarial Network.

## [Demo](http://color-this.eastus.cloudapp.azure.com/)

The site is hosted [here](http://color-this.eastus.cloudapp.azure.com/).

## [Model](https://github.com/asimsedhain/Image-Colorization-GAN)

The colorization model is based off of this [paper](https://richzhang.github.io/ideepcolor/).
You can learn more about our training process by heading over to the model repo [here](https://github.com/asimsedhain/Image-Colorization-GAN).

## Usage

The API can be accessed using the http://color-this.eastus.cloudapp.azure.com/upload/ endpoint.

|Type | Endpoint | Description |
|---|---|---|
| POST | / | endpoint for uploading the image data. A form data should be passed with the name `original` |
| GET | /IMAGE_TYPE/ID | returns the image for the specified `ID`. The `IMAGE_TYPE` should be either `orignal` or `color` for the specific image. It will send a 404 status code if the image is still being processed|

### Examples with JavaScript

### POST `/`
```javascript

// Creating a new form object and passing it using a POST request.

const data = new FormData()
data.append('Original', element.target.files[0])
const response = await fetch('upload', {
	method: 'POST',
	body: data
	});

// Receiving the IMAGE_ID from the response
const imageId = (await response.json()).imageId;			

```

### GET `/IMAGE_TYPE/ID`
```javascript

<IMG src="/IMAGE_TYPE/ID" />

```

## TODO
- [x] Improve UI
- [x] Change queue to get the whole image
- [ ] Add User Interaction
- [ ] Add Documentation
- [	] Refactor
- [ ] Deploy to Azure Kubernetes
