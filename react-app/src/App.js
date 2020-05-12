import React, { Component } from 'react';
import { Container, Navbar, NavbarText } from "reactstrap";
import UploadBox from "./components/UploadBox";
import DisplayImage from "./components/DisplayImage";
import DisplayText from "./components/DisplayText";
import { how_it_works, our_model, limitation, future_plans } from "./text";
import "./style/colors.css"
const webport = "http://color-this.eastus.cloudapp.azure.com/upload"
// const webport = "http://localhost/upload"
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
			exampleImages: [{ id: "5eb966b8514a1ff444b6c6a3", src: " ../sample_image_0.jpg", selected: false }, { id: "5eb94c98514a1f162cb6c695", src: " ../sample_image_1.jpg", selected: false }, { id: "5eb9687c07660621a91580e4", src: " ../sample_image_2.jpg", selected: false }]
		}
		this.loadImageInterval = null;
	}

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

			this.loadImageInterval = setInterval(this.loadImage, 1000);
		}
	}

	loadImage = async () => {
		const colorResponse = await fetch(`${webport}/color?id=${this.state.imageId}`)

		if (colorResponse.status === 200) {
			const originalResponse = await fetch(`${webport}/original?id=${this.state.imageId}`)
			this.setState({ imageState: 2, colorURL: URL.createObjectURL(await colorResponse.blob()), originalURL: URL.createObjectURL(await originalResponse.blob()) })
			clearInterval(this.loadImageInterval);

		}
	}

	handleImageChange = (e) => {
		this.setState({
			selectedFile: e.target.files[0],
			inputValue: e.target.value
		})
	}

	handleExampleImageMouseOver = (id) => {
		this.setState({})
	}

	handleExampleImageClick = (id) => {
		if (id !== this.state.imageId) {
			this.setState({
				imageId: id,
				imageState: 1,
				exampleImages: this.state.exampleImages.map((image) => id === image.id ? { ...image, selected: true } : { ...image, selected: false })
			})
			clearInterval(this.loadImageInterval)
			this.loadImageInterval = setInterval(this.loadImage, 1000);
		}
	}

	render() {
		return (
			<div className="App">
				<Navbar className="yellow">
					<NavbarText className="text-light mx-auto navbar-brand text-uppercase font-weight-bold"><h1>Color This</h1></NavbarText>
				</Navbar>

				<DisplayText sty="light" content={how_it_works} />
				<Container className={"my-5"}>
					<UploadBox uploadImage={this.uploadImage} handleImageChange={this.handleImageChange} inputValue={this.state.inputValue} exampleImages={this.state.exampleImages} handleExampleImageMouseOver={this.handleExampleImageMouseOver} handleExampleImageClick={this.handleExampleImageClick} />
					<DisplayImage imageState={this.state.imageState} colorURL={this.state.colorURL} originalURL={this.state.originalURL} />
				</Container>
				<DisplayText sty="yellow" content={our_model} style={{ backgroundColor: "#64dd17" }} />
				<DisplayText sty="white" content={limitation} />
				<DisplayText sty="light" content={future_plans} />
				<footer>
					<div className="container-fluid yellow text-center text-light p-4">Copyright &copy; Ashim Sedhain
					</div>
				</footer>
			</div >
		);
	}
}

export default App;
