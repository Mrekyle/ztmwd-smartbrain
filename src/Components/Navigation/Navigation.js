import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
		if (isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => { onRouteChange('signout')}} className="f3 link underline pa3 black pointer">Sign Out</p>
			</nav>	
		);
		} else {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => { onRouteChange('signin')}} className="f3 link underline pa3 black pointer">Sign In</p>
					<p onClick={() => { onRouteChange('register')}} className="f3 link underline pa3 black pointer">Register</p>
				</nav>	
			);
		}
}

export default Navigation;

// By adding an arrow function into the onClick, it allows us to make it so the route change is only ran when the onclick happens! SO when the button
// Has been clicked, it will run the route change function.