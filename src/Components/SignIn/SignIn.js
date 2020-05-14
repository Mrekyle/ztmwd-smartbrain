import React from 'react';


const SignIn = ({ onRouteChange }) => {
	return (
		<article className='mw5 br3 shadow-5 center br3 pa3 pa4-ns mv3 mw6 ba b--black-10'>
			<main className='pa4 black-80'>
			  <div className='measure'>
			    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
			      <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
			      <div className='mt3'>
			        <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
			        <input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='email' name='email-address'  id='email-address' />
			      </div>
			      <div className='mv3'>
			        <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
			        <input className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='password' name='password'  id='password' />
			      </div>
			    </fieldset>
			    <div className=''>
			      <input  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={() => { onRouteChange('home')}} type='submit' value='Sign in' />
			    </div>
			    <div className='lh-copy mt3'>
			      <p onClick={() => { onRouteChange('register')}} className='f6 pointer link dim black db'>Register</p>
			    </div>
			  </div>
			</main>
		</article>
	);
}

export default SignIn;


// By adding an arrow function into the onClick, it allows us to make it so the route change is only ran when the onclick happens! SO when the button
// Has been clicked, it will run the route change function.