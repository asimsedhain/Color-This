import React, { Component } from 'react';
import { Container, Navbar, NavbarText } from "reactstrap";
import UploadBox from "./components/UploadBox";
import DisplayImage from "./components/DisplayImage";
import DisplayText from "./components/DisplayText";
import { how_it_works, our_model, limitation, future_plans } from "./text";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			inputValue: "",
			imageState: 0,
			imageId: null,
			colorURL: null,
			originalURL: null
		}
		this.loadImageInterval = null;
	}

	uploadImage = async (e) => {
		e.preventDefault();
		const data = new FormData()
		data.append('Original', this.state.selectedFile)
		const response = await fetch('http://localhost:5000/upload', {
			method: 'POST',
			body: data
		});
		const imageId = (await response.json()).imageId;
		this.loadImageInterval = setInterval(this.loadImage, 1000);
		this.setState({
			selectedFile: null,
			inputValue: "",
			imageState: 1,
			imageId: imageId
		})
	}

	loadImage = async () => {
		const colorResponse = await fetch(`http://localhost:5000/upload/color?id=${this.state.imageId}`)
		
		if (colorResponse.status === 200) {
			const originalResponse = await fetch(`http://localhost:5000/upload/original?id=${this.state.imageId}`)
			this.setState({ imageState: 2, colorURL: URL.createObjectURL(await colorResponse.blob()), originalURL: URL.createObjectURL(await originalResponse.blob())})
			clearInterval(this.loadImageInterval);
		}
	}

	handleImageChange = (e) => {
		this.setState({
			selectedFile: e.target.files[0],
			inputValue: e.target.value
		})
	}

	render() {
		return (
			<div className="App">
				<Navbar className="bg-dark">
					<NavbarText className="text-light mx-auto navbar-brand text-uppercase font-weight-bold"><h1>Color This</h1></NavbarText>
				</Navbar>

				<DisplayText sty="light" content={how_it_works} />
				<Container className={"my-5"}>
					<UploadBox uploadImage={this.uploadImage} handleImageChange={this.handleImageChange} inputValue={this.state.inputValue} />
					<DisplayImage imageState={this.state.imageState} colorURL={this.state.colorURL} originalURL={this.state.originalURL} />
				</Container>
				<DisplayText sty="dark" content={our_model} />
				<DisplayText sty="white" content={limitation} />
				<DisplayText sty="light" content={future_plans} />
				<footer>
					<div className="container-fluid bg-dark text-center text-light p-4">Copyright &copy; Ashim Sedhain
					</div>
				</footer>
			</div >
		);
	}
}

export default App;
