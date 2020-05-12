import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, helloThere }) => {
	return (
		<div>
		<p className='f3 center'>
			{'This app will detect a face! Give it an image and try it out!'}
		</p>
			<div className='center'>
				<div className='form center pa3 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button onClick={helloThere} className='w-30 grow f4 link pv2 ph3 dib white bg-light-purple'>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm; 

// This is the input and button for the app, With some basic tachyons and custom styling. It was also handed the props, defined in app.js allowing funcionality 
// To be added to each of the inputs, More indepth notes are on the app.js page 