import React, { Component } from 'react';
import { Container, Row, Col, Navbar, NavbarText } from "reactstrap";
import UploadBox from "./components/UploadBox"
import DisplayImage from "./components/DisplayImage"
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			inputValue: "",
			imageState: 0,
			imageId: null
			// imageState: 1,
			// imageId: '5eb4d443fd0fc31ac0215cc4'
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
		const response = await fetch(`http://localhost:5000/upload/color?id=${this.state.imageId}`)

		if (response.status === 200) {
			this.setState({ imageState: 2 })
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
				<Container fluid={true} className="bg-light py-5">
					<Container>
						<Row >
							<Col>
								<div><h2 className="text-secondary">How it works</h2></div>
								<div><h3 className="font-weight-light text-secondary">Colorization Using Deep Learning</h3></div>
								<div className="text-secondary mt-3 font-weight-light">Submit your image below and using our deep learning state of the art model, we will produce a realistic colorization.</div>
								<div className="text-secondary font-weight-light">Make your old pictures come back to life with the power of deep learning.</div>
							</Col>
						</Row>
					</Container>
				</Container>
				<Container className="my-5">
					<Row>
						<Col sm="9" md="7" lg="5" className="mx-auto">
							<UploadBox uploadImage={this.uploadImage} handleImageChange={this.handleImageChange} inputValue={this.state.inputValue} />
						</Col>
					</Row>
					<Row>
						<DisplayImage imageState={this.state.imageState} imageId={this.state.imageId} />
					</Row>
				</Container>
				<Container fluid={true} className="bg-dark py-5">
					<Container>
						<Row >
							<Col>
								<div><h2 className="text-light">Our Model</h2></div>
								<div><h3 className="font-weight-light text-light">Deep Generative Adversarial Network</h3></div>
								<div className="text-light mt-3 font-weight-light">Our model is based on the paper by *insert name*. It has been trained on one million images from the ImageNet dataset running on sixteen Nvidia 1080 ti.</div>
								<div className="text-light font-weight-light">You can learn more about the training process over here.</div>
							</Col>
						</Row>
					</Container>
				</Container>
				<footer>
					<div className="container-fluid bg-dark text-center text-light p-4">Copyright &copy; Ashim Sedhain
					</div>
				</footer>
			</div >
		);
	}
}

export default App;
