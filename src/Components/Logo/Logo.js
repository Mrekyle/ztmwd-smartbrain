import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png';
import './Logo.css';


const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 250, width: 250 }} >
				 <div className="Tilt-inner pa3"><img style={{height: '150px', width:'150px', paddingTop: '30px'}}alt='logo' src={brain}/></div>
			</Tilt>
		</div>
	);
}


export default Logo;

// All this is for is the logo of the page, with the source being inside of this file, it does need to be imported like everything else, but specified like above
// THis also has the tilt effects, which can be fully customised like everything! Again, full instructions are on the website in my bookmarks