import React from "react";
import { Col, CardBody, Row  } from "reactstrap";
import ReactLoading from 'react-loading';

function DisplayImage(props) {

	let renderImage = ()=>{
	if (props.imageState === 2) {
		return (<React.Fragment>
			<Col className="d-flex justify-content-xl-center justify-content-lg-center justify-content-md-between justify-content-sm-between flex-wrap" >
				<div className="mx-auto mx-md-auto mx-sm-auto mx-lg-5 mx-xl-5 my-2">
					<h5 className="text-center text-secondary">Original Image</h5>
					<CardBody>
						<img src={props.originalURL} alt="" width="256" height="256" />
					</CardBody>

				</div>

				<div className="mx-auto mx-sm-auto mx-md-auto mx-lg-5 mx-xl-5 my-2">
					<h5 className="text-center text-secondary">Colored Image</h5>
					<CardBody>
						<img src={props.colorURL} alt="" width="256" height="256" />
					</CardBody>

				</div>
			</Col>

		</React.Fragment >)
	} else if (props.imageState === 1) {
		return (<div className="mx-auto"><div className="text-uppercase font-weight-light">coloring at the speed of light</div><ReactLoading type="balls" color={"#427AA1"} height={'30%'} width={'30%'} className="mx-auto" /></div>)
	} else {
		return (<React.Fragment></React.Fragment>)
	}

}
	return (
		<Row>
			{renderImage()}
		</Row>
	)
}

export default DisplayImage;
