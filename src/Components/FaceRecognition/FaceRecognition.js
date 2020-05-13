import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/> 
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;

// height: auto - will automatically adjust the height of an image depending on the width, so that the image will always be in proportion and not swquished

// If an alt is set, as when the page is loaded there is no image being displayed! It will show the alt instead. As it thinks there is no image! 
// But when an image has been given to detect, it will remove it! In this scenario, It may be best to leave the alt undefined. In react you will always
// Have to define an alt on an img tag, Otherwise you will get compiling warnings.. Whilst not breaking the app, It can be annoying to constantly see in the log