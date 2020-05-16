import React from 'react';


class Register extends React.Component {				// This is almost identical to the Signin Component! With a few differences as it needs a name, etx
	constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})		
  }	
  onEmailChange = (event) => {
    this.setState({email: event.target.value})		
  }															

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  onSubmitSignIn = () => {									
    fetch('http://localhost:3000/register', {					// Registering a user is almost identical as signing in, You just need to chamge a few things around
      method: 'post',											// And add a few things, such as any other information needed! And maybe some extra props in the app file
      headers: {'Content-Type': 'application/json'},			// And there you go! 
      body: JSON.stringify({
      	name: this.state.name,
      	password: this.state.passsword,
        email: this.state.email,
      })
    })
    .then(response => response.json())						 
    .then(user => {											
    	if (user)
    	this.props.loadUser(user);				// This is so we can load the user information, onto the home page to display who is logged in.					
    	this.props.onRouteChange('home');			
    })
}
	render() {
		return (
			<article className='mw5 br3 shadow-5 center br3 pa3 pa4-ns mv3 mw6 ba b--black-10'>
				<main className='pa4 black-80'>
				  <div className='measure'>
				    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
				      <legend className='f1 fw6 ph0 mh0'>Register</legend>
				       <div className='mt3'>
				        <label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
				        <input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
				        	onChange={this.onNameChange}
					        type='text' 
					        name='name'  
					        id='name' 
					        />
				      </div>
				      <div className='mt3'>
				        <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
				        <input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
				        	onChange={this.onEmailChange}
					        type='email' 
					        name='email-address'  
					        id='email-address' 
					        />
				      </div>
				      <div className='mv3'>
				        <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
				        <input className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
				        	onChange={this.onPasswordChange}
					        type='password' 
					        name='password'  
					        id='password' 
					        />
				      </div>
				    </fieldset>
				    <div className=''>
				      <input  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' 
					      onClick={this.onSubmitSignIn} 
					      type='submit' 
					      value='Register'
					       />
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;


// By adding an arrow function into the onClick, it allows us to make it so the route change is only ran when the onclick happens! SO when the button
// Has been clicked, it will run the route change function.