import React from "react";
import { Container, Row, Col } from "reactstrap";

function DisplayText(props) {

	let getStyle = (style) => {
		
		switch (style) {
			case "light":
				return { bg: "bg-light", text: "text-secondary" }
			case "dark":
				return { bg: "bg-dark", text: "text-light" }
			case "secondary":
				return { bg: "bg-secondary", text: "text-light" }
			case "yellow":
				return { bg: "yellow", text: "text-light" }
			case "green":
				return { bg: "green", text: "text-light" }
			default:
				return { bg: "bg-white", text: "text-secondary" }
		}
	}

	let renderPoints = (points) => {
		if (points) {
			return (<ul className={"mt-2"}>{points.map((point, index) => <li key={index} className={`font-weight-light  ${getStyle(props.sty).text}`}>{point}</li>)}</ul>)
		}
		else {
			return (<React.Fragment />)
		}
	}
	return (

		<Container fluid={true} className={`${getStyle(props.sty).bg} py-5`}>
			<Container>
				<Row >
					<Col>
						<div><h2 className={`${getStyle(props.sty).text}`}>{props.content.heading}</h2></div>
						<div><h3 className={`font-weight-light ${getStyle(props.sty).text}`}>{props.content.subheading}</h3></div>
						{props.content.text.map((text, index) => <div key={index} className={`font-weight-light  ${getStyle(props.sty).text}`}>{text}</div>
						)}
						{renderPoints(props.content.points)}
					</Col>
				</Row>
			</Container>
		</Container>

	)
}

export default DisplayText




