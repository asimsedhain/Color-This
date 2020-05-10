import React from "react";
import {Container, Row, Col} from "reactstrap";

function DisplayText(props) {

	let getStyle = (style) =>{
		if(style==="light"){
			return {bg: "bg-light", text:"text-secondary"}
		}
		else if(style==="dark"){
			
			return {bg: "bg-dark", text:"text-light"}
		}else if (style==="secondary"){
			return {bg: "bg-secondary", text:"text-light"}
		}else{
			return { bg: "bg-white", text:"text-secondary"}
		}
	}

	let renderPoints = (points)=>{
		if(points){
		return (<ul className={"mt-2"}>{points.map((point)=><li className={`font-weight-light  ${getStyle(props.sty).text}`}>{point}</li>)}</ul>)
		}
		else{
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
						{props.content.text.map((text)=><div className={`font-weight-light  ${getStyle(props.sty).text}`}>{text}</div>
						)}
						{renderPoints(props.content.points)}
					</Col>
				</Row>
			</Container>
		</Container>

	)
}

export default DisplayText




