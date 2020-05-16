import React from 'react';

class Signin extends React.Component {						// This is creating the states for the sign in, With out this, it would cause an error and crash
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})		// Both of these functions are listening to any updates that occur in the input feilds
  }															// Of their respective properties

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

onSubmitSignIn = () => {									// This is saying that when the submit button has been pressed, it will run the 
    fetch('http://localhost:3000/signin', {					// fetch method, which will send the information to the server, But that is automatically a GET
      method: 'post',										// So you have to pass it an object defining what you want it to do.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,						// For the server to understand what you are sending, you need to send it using JSON and stringify
        password: this.state.signInPassword					// These 2 elements, are just giving the property that was given by the user on input
      })
    })
    .then(response => response.json())						// This statement is saying that if the response matches up with data from the database
    .then(user => {											          // continue and let them log in and continue using the application
    	if (user.id)		                            // If not, dont let them log in and use the application.
      this.props.loadUser(user)						
    	this.props.onRouteChange('home');					  // This is sending the user to the home page once the button has been clicked.
    })
}

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;


// By adding an arrow function into the onClick, it allows us to make it so the route change is only ran when the onclick happens! SO when the button
// Has been clicked, it will run the route change function.