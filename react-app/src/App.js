import React, { Component } from 'react';
import { Container, Navbar, NavbarText, Row, Col } from "reactstrap";
import UploadBox from "./components/UploadBox";
import DisplayImage from "./components/DisplayImage";
import DisplayText from "./components/DisplayText";
import { how_it_works, our_model, limitation, future_plans } from "./text";
import "./style/colors.css"
import modelIcon from "./components/model.svg"
import limitIcon from "./components/limit.svg"
import futureIcon from "./components/future.svg"
// const webport = "http://color-this.eastus.cloudapp.azure.com/upload"
// const webport = "http://localhost/upload"
const webport = "/upload"

class App extends Component {

	constructor(props) {
		super(props);


		this.state = {
			selectedFile: null,
			inputValue: "",
			imageState: 0,
			imageId: null,
			colorURL: null,
			originalURL: null,
			exampleImages: [{ id: "5ec14ad608db08b724a2b4e0", src: " ../sample_image_0.jpg", selected: false }, { id: "5ec14be608db082acaa2b4e1", src: " ../sample_image_1.jpg", selected: false }, { id: "5ec14c1608db080a3ca2b4e3", src: " ../sample_image_2.jpg", selected: false }]
		}


		this.loadImageInterval = null;
	}

	// Function uploads the image from the form
	uploadImage = async (e) => {
		e.preventDefault();

		if (this.state.selectedFile) {

			this.setState({
				inputValue: "",
				imageState: 1,
				exampleImages: this.state.exampleImages.map((image) => ({ ...image, selected: false }))
			})

			const data = new FormData()
			data.append('Original', this.state.selectedFile)
			const response = await fetch(webport, {
				method: 'POST',
				body: data
			});

			const imageId = (await response.json()).imageId;

			this.setState({
				selectedFile: null,
				imageId: imageId,
			})

			// Sets and interval to call the function loadimage every second to see if the image has been processed.
			this.loadImageInterval = setInterval(this.loadImage, 1000);
		}
	}

	// Function loads the image if it is avaiable
	// if not it won't do anything
	loadImage = async (skip) => {
		const skipDictionary = skip ? "true" : ""
		const colorResponse = await fetch(`${webport}/color?id=${this.state.imageId}&skipDictionary=${skipDictionary}`)

		if (colorResponse.status === 200) {
			const originalResponse = await fetch(`${webport}/original?id=${this.state.imageId}&skipDictionary=${skipDictionary}`)
			this.setState({ imageState: 2, colorURL: URL.createObjectURL(await colorResponse.blob()), originalURL: URL.createObjectURL(await originalResponse.blob()) })
			clearInterval(this.loadImageInterval);

		}
	}

	// Handler for change in the form data
	handleImageChange = (e) => {
		this.setState({
			selectedFile: e.target.files[0],
			inputValue: e.target.value
		})
	}

	// Handle the event of example image click
	handleExampleImageClick = (id) => {
		if (id !== this.state.imageId) {
			this.setState({
				imageId: id,
				imageState: 1,
				exampleImages: this.state.exampleImages.map((image) => id === image.id ? { ...image, selected: true } : { ...image, selected: false })
			})
			clearInterval(this.loadImageInterval)
			this.loadImageInterval = setInterval(() => this.loadImage(true), 1000);
		}
	}

	render() {
		return (
			<div className="App">
				<Navbar className="yellow">
					<NavbarText className="text-white mx-auto navbar-brand text-uppercase font-weight-bold"><h1>Color This</h1></NavbarText>
				</Navbar>
				<div>
				</div>

				<DisplayText sty="light" content={how_it_works} />
				<Container className={"my-5"}>
					<UploadBox uploadImage={this.uploadImage} handleImageChange={this.handleImageChange} inputValue={this.state.inputValue} exampleImages={this.state.exampleImages} handleExampleImageClick={this.handleExampleImageClick} />
					<DisplayImage imageState={this.state.imageState} colorURL={this.state.colorURL} originalURL={this.state.originalURL} />
				</Container>
				<DisplayText sty="yellow" content={our_model} style={{ backgroundColor: "#EBF2FA" }} icon={modelIcon}/>
				<DisplayText sty="white" content={limitation} icon={limitIcon} iconOrder={1}/>
				<DisplayText sty="light" content={future_plans} icon={futureIcon} />
				<footer>
					<div className="container-fluid yellow text-center text-light p-4">Copyright &copy; Ashim Sedhain
					</div>
				</footer>
			</div >
		);
	}
}

export default App;
