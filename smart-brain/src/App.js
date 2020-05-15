import React, { Component } from 'react'; // Standard inporting for react apps, if using normal js, no need for Component, but if using new react js, It is needed 
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';

import './App.css';

const app = new Clarifai.App({ 					// This is telling the server that I am able to access the api with this key. Although not the same as every 
	apiKey: '46cd60645f2f41178e02fc35b1ad7ed7'  // API It is very simaler to the rest, Each api has it own way of doing things, So just remember to read/follow
})												// There instructions on the site, and you should have no problems

const particleOptions = { // This is the particle effects on the background, It is fully customisable, link saved in dev space! Just adjust the 
	particles: {		  // paramaters/numbers to change it! Everything explained on the website/git
		number: {
			value: 45,
		density: {
			enable: true,
			value_area: 800,
		}
	}
}
}

class App extends Component { // This is where all the main states for the app are to be defined
	constructor() { // When using the constructor, you have to use super() to be able to access it, otherwise it will return an error
		super();	// Constructors allow you to set props that can be handed inside of functions and down to certain elements.
		this.state = {
			input: '',
			imageUrl: '', // The image url state is being used as the source, to be able to display the image
			box: [],	// This constains the value's that we receive from the output, They are from the bounding_box we get below 
			route: 'signin',  // This state keeps tracks of where we are in the app, and will adjust things accordingly! Such as not having the app open, until the user has signed into the app
			isSignedIn: false
		}
	} 

// componentDidMount() {					// This is going to find the back end server on the port that has been specified. It will then grab all the data
// 	fetch('http://localhost:3000')		// by using console.log
// 		.then(response => response.json())
// 		.then(console.log);
// }

calculateFaceLocation = (data) => {
	const clarifaiFace  = data.outputs[0].data.regions[0].region_info.bounding_box; // This is getting the required data from the output that we receive from the image
		const image = document.getElementById('inputImage'); 	// This is selecting the image for us and by using the information received above, we are able to manipulate the dom and add what we want
		const width = Number(image.width);
		const height = Number(image.height);
		return {											// I dont understand the math, So just watch the video 
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
}

displayFaceBox = (box) => {
	this.setState({box: box})
}

onInputChange = (event) => {
	this.setState({input: event.target.value}); // When a new input is detected inside of the text area, this is telling it to display what the input instructions
}												// in this case, its displaying an image. If we were just logging the event, we could detect anything inside
												// Of the input box, such as text! 
// To get the value of the input, you need to use the above code in the console.log paramaters

helloThere = () => { // Button - I had problems getting the button name to work from the lesson, So i winged it! As from what I can tell, the example is now part of keywords.
	this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input) // In here, you can change what model is being detected by clarifai, by just changing the model according to what the api offers
		.then(response => this.displayFaceBox(this.calculateFaceLocation(response))) // This will now call the above function, which will find the required data, and produce an output	
	 	.catch(err => console.log(err))						 		 // Here it will catch any errors and log it into the console
}

// By using the arror functions, we are able to clean this up and make the code flow better making it easier to read. This is due to the constant updates of the language.

onRouteChange = (route) => {
	if (route === 'signout') {
		this.setState({isSignedIn: false})  
	} else if (route === 'home') { 
		this.setState({isSignedIn: true})
	}
	this.setState({route: route}) // Must be wrapped inside curly brackets, as its an object. By setting it to 'home', it will send it to the default page
}								   // Then you can adjust the different pages by going into the specific page, and on onRouteChange, just give it the page/app you want it to direct to.

// When I first tested this, I had a memory leak! The error said that 'route' was defined too many times inside itself. This was changed by adding the arror functions to the onclick. See inside the files for notes.

render() {
	const { isSignedIn, route, box, imageUrl} = this.state;
		return (
			<div className="App">
				 <Particles className='Particles1' params={particleOptions}/> 
				 <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				 { route === 'home' 
				 ? <div>
				 		<Logo />
				 		<Rank />
				 		<ImageLinkForm onInputChange={this.onInputChange} helloThere={this.helloThere}/> 
			     		<FaceRecognition box={box} imageUrl={imageUrl}/>
			       </div>
			     : (
			     	this.state.route === 'signin'
			     	? <SignIn onRouteChange={this.onRouteChange}/> // The function on here is changing the route of where it directs the user once signed in
			     	: <Register onRouteChange={this.onRouteChange}/>
			     	)
			    }
			</div>
	);
}
}

export default App;
 
//  console.log(response.outputs[0].data.regions[0].region_info.bounding_box); // this is going into the output and selecting the specific information that we need
// 	To be able to add the face detection box.

// For onInputChange to work, you have to use this. as it is a property of the app, otherwise it is undefined and will not register.
// 90% of the styling in this app has been done with tachyons, this is an npm package, which is saved in my dev spave bookmarks which shows all the avalibale tags
// Some has been self defined, and that means a css file has been made, and imported into the page

// Calling setState() in React is asynchronous, for various reasons (mainly performance). Under the covers React will batch multiple calls to 
// setState() into a single call, and then re-render the component a single time, rather than re-rendering for every state change. Therefore the 
// imageUrl parameter would have never worked in our example, because when we called Clarifai with our the predict function, React wasn't finished 
// updating the state. 

// One way to go around this issue is to use a callback function:
// setState(updater, callback)

// Read more information here https://reactjs.org/docs/react-component.html#setstate

// To make one js Component display before the others, set it a state of 'route' like above, and then use a conditional statmemnt. Remembering to wrap it in a div.

// For deployment of react apps, you will need to use the npm build comand in the console! As this will compile all the nesecary files and dependencies 
// For the app to run, and it will do it in the most efficent way posisble!


