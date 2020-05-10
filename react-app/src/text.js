
const how_it_works = {
	heading: "How it works",
	subheading: "Colorization Using Deep Learning",
	text: ["Submit your image below and using our deep learning state of the art model, we will produce a realistic colorization.",
		"Make your old pictures come back to life with the power of deep learning."]
}
const our_model = {
	heading: "Our Model",
	subheading: "Deep Generative Adversarial Network",
	text: ["Our model is based on the paper by *insert name*. It has been trained on one million images from the ImageNet dataset running on sixteen Nvidia 1080 ti.",
		"You can learn more about the training process over here."]
}
const limitation = {
	heading: "Current Limitation",
	subheading: "Deep Learning is Hard",
	text: ["Due to constrains of resources we are not able to deliver the best possible results.", "The following is a list of limitation of our current model.	"],
	points: ["256 X 256 image size", "Only square ratio supported", "Images' ratio will be changed to square, so crop/edit before trying it out","Discolored skin", "No user interactibility"]
}

const future_plans = {
	heading: "Planned Features",
	subheading: "The Future Man!",
	text:["It might seem doom and gloom, friends. But worry not, our slaves *ahem ahem* I mean, our engineers are working hard to bring the best experience.", "The following is a list of features planned to released soon."], 
	points: ["Increased image resolution", "User Interaction", "Support for videos", "Variable Image ratios"]

}




export { how_it_works, limitation, future_plans, our_model };