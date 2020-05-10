import React from "react";
import { Component } from 'react';
import { Card, CardBody, CardHeader } from "reactstrap";

class UploadBox extends Component {
	constructor(props) {
			super(props);
	}
	

	uploadImage = (e) => {
		alert("Hello");
		e.preventDefault();


	}

	render() {
		return (<Card className="my-3">
			<CardHeader tag="h5" className="text-center">Colorize Your Image</CardHeader>

			<CardBody>
				<form className="form-signin" id="form" action="/upload" method="POST" encType="multipart/form-data" >
					<div className="form-group" onSubmit={this.props.uploadImage}>
						<input type="file" id="Image" className="form-control " name="Original" placeholder="Submit Image" required  onChange={this.props.handleImageChange} value={this.props.inputValue}/>
					</div>
					<button className="btn btn-primary btn-block text-uppercase" value="Submit" id="login"
						type="submit" onClick={this.props.uploadImage}>Submit</button>
				</form>
			</CardBody>
		</Card>)

	}

}

export default UploadBox;
