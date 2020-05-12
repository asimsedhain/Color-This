import React from "react";
import { Row, Col, Card, CardBody, CardHeader, CardText } from "reactstrap";

function UploadBox(props) {

	return (

		<Row>
			<Col sm="9" md="7" lg="5" className="mx-auto">
				<Card className="my-3" style={{ borderRadius: 0 }}>
					<CardHeader tag="h5" className="text-center bg-light text-dark">Colorize Your Image</CardHeader>
					<CardBody>
						<CardText tag="h5" className="text-secondary">Submit Your Image</CardText>
						<form className="form-signin" id="form" action="/upload" method="POST" encType="multipart/form-data" >
							<div className="form-group" onSubmit={props.uploadImage}>
								<input type="file" id="Image" className="form-control" style={{ borderRadius: 0 }} name="Original" placeholder="Submit Image" required onChange={props.handleImageChange} value={props.inputValue} />
							</div>
							<button className="btn yellow btn-block text-uppercase text-light" value="Submit" id="login"
								type="submit" onClick={props.uploadImage} style={{ borderRadius: 0 }}>Submit</button>
						</form>
						<div className="mt-3">

							<CardText tag="h5" className="text-secondary">Or, Try a Sample Image</CardText>

							<div className="d-flex" style={{ borderRadius: 0 }}>
								<Row>
									{props.exampleImages.map((image)=>
										<Col key={image.id}>
										<img src={image.src}  alt="Sample" style={image.selected? {borderRadius:0}:{filter: "grayscale(100%)", borderRadius:0}} className="img-thumbnail" onClick={props.handleExampleImageClick.bind(this, image.id)} ></img>
										</Col>
									)}
								
								</Row>
							</div>
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	)

}


export default UploadBox;
