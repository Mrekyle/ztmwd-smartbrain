const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client: 'pg',  			// This is tell the knex package where the Database is living and how to log in. With knex, you will also have to install the 
	connection: {			// Database npm package, Full instructions on the website 
	    host : '127.0.0.1', // - The same as local host
	    user : 'kylechart',
	    password : '',
	    database : 'smart-brain'
  }
});

// db.select('id').from('users').then(data => { 	// This is the basic way of accessing data from a selected table inside the database 
// 	console.log(data);
// });

const app = express();



app.use(express.json()); // To access information given by JSON format, so the server can understand it 
app.use(express.urlencoded({extended: false})); // Information by post method

app.use(cors()); 	// This is basically allowing you to bypass the google secuurity error

app.get('/', (req, res) => {
	res.send(dataBase.users);
})

const dataBase = { 			// This is the basic way of creating a test user database for a log in system! This is not how it is done once deployed 
	users: [				// But it is perfect for testing purposes! 
	{
		id: '123',
		name: 'Kyle',
		password: 'chocolate',			// We never store information, such as a database of users in a varible. As it wont persist! Every time the server
		email: 'kylechart@gmail.com',	// Starts, it will just run with what information that it has pre defined by the programmer! This is why we 
		entries: 0,						// use databases to store this information.
		joined: new Date(),
	},
	{
		id: '124',
		name: 'Taylor',
		password: 'Truffles',
		email: 'Taylort@gmail.com',
		entries: 0,
		joined: new Date(), // new Date() Will generate what ever date and time that the user was created. This is a way of getting the date of when somthing 
	}						// Has happened, Like a new user being created 
	]
}

app.post('/signin', (req, res) => { // This is the basic way of creating a sign in form, checking the database for the user information! And if it matches
	db.select('email', 'hash').from('login') 
	.where('email', '=', req.body.email)	// This is checking if the emails given into the sigin paramater matches the one with the login
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);	// This if the email matches, it compares the hash to the password given, as only the server knows the true value
		if (isValid) {													// And if they match, then it logs in. If not it gives an error
		return db.select('*').from('users').where('email', '=', req.body.email)
		.then(user => {
			res.json(user[0])
		}) 
		.catch(err => res.status(400).json('Unable to get user.'))
		}	
	})
	.catch(err => res.status(400).json('Wrong Credentials.'))	
})
//		OLD CODE 
// if (req.body.email === dataBase.users[0].email && 			// Any of the information it sends a success, If not it will throw an error. 
// 		req.body.password === dataBase.users[0].password) {
// 		res.json(dataBase.users[0]);
// 	} else {
// 		res.status(400).json('Error Logging In.'); 
// 	}

app.post('/register', (req, res) => {
	const { email, password, name } = req.body;	
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {		// The transaction statmenet here is saying to update the login table first and then update the user table
		trx.insert({			// But a feature of transactions, means that if one fails they both fail. So you dont get inconsistent database information
			hash: hash,
			email: email,
		})
		.into('login')
		.returning('email')		// This returns the email, as the email is the only matching item in each table, adding it to an function allows us to 
		.then(loginEmail => {	// Store the email, and use the information later on, to update the users table at the same time.
			return trx('users')
			.returning('*')			// This db knex code here, is almost identical as before, all it is doing is instead of returing it to the const database
			.insert({				// it is connecting with the database and adding the information to the table 
				name: name,
				email: loginEmail[0], 
				joined: new Date,
			})
			.then(user => { res.json(user[0]);
		})
	})
		.then(trx.commit)		// This is part of the transaction feature, meaning that everytimg you use it, you have to commit the changes to update the tables, Like commiting changes in github
		.catch(trx.rollback)	// This says if an error happens, it will roll back any changes or updates that have been made to the tables 
	})
		.catch(err => res.status(400).json('Unable to Register at this time! Please try again'));
})	

//		OLD CODE
	// 	dataBase.users.push({			
	// 	id: '125',
	// 	name: name,
	// 	email: email,
	// 	entries: 0,
	// 	joined: new Date(),
	// })														
// res.json(dataBase.users[dataBase.users.length-1]); 	This grabs the last user in the array! So we are able to display that informationto the New user

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;				// This allows us to get the id paramater of the user that has logged into the system
	db.select('*').from('users').where({id})				// This is asking the database for the user information associated to the id! And asking it
	.then(user => { if (user.length) { res.json(user[0])	// To return the information, or if the user id doesnt exist, let us know
	} else { res.status(400).json('User does not exist.')}
		})
	.catch(err => res.status(400).json('Error finding user.'))
})

// 		OLD CODE
// let found = false; 			 This is saying, that if the user doesnt exist until the user has been found and turned to true, in which case it will return the user information
// dataBase.users.forEach(user => {		This is allowing us to loop through the database to get the correct corisponding information
// 	if (user.id === id) {				 This is saying that if it finds a match, it will respond with the user information
// 		found = true;					 
// 		return res.json(user);
// 	} 									
// }) if (!found) {
		// res.status(404).json('No Such User'); })	This is saying that if it cant find a match for the user, then there is no such user in the database

app.put('/image', (req, res) => {  				// This whole section of code here is finding the user like above, and matching it wiith the database.
	const { id } = req.body;					// Then it is finding the entries and adding 1 to the total every time that user inputs an image into the app 
	db('users').where('id', '=', id)			// This is incrementing the entries in the database by 1 each time it is called
	.increment('entries', 1).returning('entries').then(entries => { res.json(entries[0])
	})	
	.catch(err => res.status(400).json('Error updating entries!')) 	// Standard error code/syntax 
})	

//		OLD CODE
// let found = false;							
// 	dataBase.users.forEach(user => {
// 		if (user.id === id) {
// 			found = true;
// 			user.entries++
// 			return res.json(user.entries);
// 		}
// 	})
// 	if (!found) {
// 		res.status(404).json('No Such User');
// 	}

app.listen(3000, () => {	// Always have this as the final code on the page!
	console.log('Loud and clear Homie!'); // This is the basic way of knowing weather your server is actually working and responding to any requests that are made to it! 
});


// req, res - Means request and Response 

/*
When building out a server api/app/website/javascript file! Its a good habit/idea to outline everything you want to happen/want on the 
page/functionality you want. It is also a good idea to build everything one by one in a systematic order, So that you can make sure everything works
and that you will get no errors in the ned results, as you are debugging as you go! It allows you to tesst everything as its being built! When first starting
out as a developer, its best to build things the way you know how! And once It is done and everything is working, then go in and improve/clean the code
to make it easier to read and run more efficently! 


/ --> This is working 
/signin --> POST = Success/fail
/register --> POST = Add new users to the database
/profile/:id --> GET = Will return user information
/image --> PUT = Update user score based on how many images they have sumbitte to the applicaiton
*/
