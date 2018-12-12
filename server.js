/* server.js nov19 - 4pm */
'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client
const session = require('express-session')
const hbs = require('hbs')


const { ObjectID } = require('mongodb')

// Import our mongoose connection
const { mongoose } = require('./db/mongoose');

// Import the models
const { User } = require('./models/user');
const { Table } = require('./models/table');

// express
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended:true }))

// set the view library
app.set('view engine', 'hbs')

// static js directory
app.use(express.static('public'))


// Add express sesssion middleware
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}))

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (req.session.user) {
		res.redirect('/create')
	} else {
		next();
	}
}

// route for root; redirect to login
app.get('/', sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/public/main.html')
})


// route for login
app.route('/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/public/login.html')
	})

app.get('/create', (req, res) => {
	if (req.session.user) {
		res.sendFile(__dirname + '/public/create.html')
	} else {
		res.redirect('/loginWrong')
	}
})

app.get('/loginWrong', (req, res) => {
		res.sendFile(__dirname + '/public/loginWrong.html')

})
app.get('/admin', (req, res) => {
		res.sendFile(__dirname + '/public/admin.html')

})

// User login and logout routes

app.post('/users/login', (req, res) => {
    if(req.body.email == "admin123" && req.body.password == "nopassword"){
	            res.redirect('/admin')
	}else{


	const email = req.body.email
	const password = req.body.password

	User.findByEmailPassword(email, password).then((user) => {

      		if(!user) {
      			res.redirect('/loginWrong')
      		} else {
      			// Add the user to the session cookie that we will
      			// send to the client
      			req.session.user = user._id;
      			req.session.email = user.email;
      			req.session.name = user.name;

      			res.redirect('/create')
      		}
      	}).catch((error) => {
      		res.status(400).redirect('/loginWrong')
      	})}
})

app.post('/users/loginWrong', (req, res) => {
    if(req.body.email == "admin123" && req.body.password == "nopassword"){
	            res.redirect('/admin')
	}else{
	const email = req.body.email
	const password = req.body.password

	User.findByEmailPassword(email, password).then((user) => {
		if(!user) {
			res.redirect('/loginWrong')
		} else {
			// Add the user to the session cookie that we will
			// send to the client
			req.session.user = user._id;
			req.session.email = user.email;
			req.session.name = user.name;
			res.redirect('/create')
		}
	}).catch((error) => {
		res.status(400).redirect('/loginWrong')
	})}
})

app.get('/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/login')
		}
	})
})


// Authentication for student resource routes
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.redirect('/login')
		})
	} else {
		res.redirect('/login')
	}
}




/** User routes **/
app.post('/users', (req, res) => {

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		table:[]
	})

	// save user to database
	user.save().then((result) => {
		res.send(user)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})

})

app.get('/user',  (req, res) => {
    res.send({name:req.session.name})
})


app.get('/userInfo',  (req, res) => {
	const id = req.session.user
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)
		}
	}).catch((error) => {
		res.status(400).send(error)
	})

})


app.get('/tables',  (req, res) => {
	Table.find().then((tables) => {
		res.send({tables})
	}, (error) => {
		res.status(400).send(error)
	})
})


app.get('/users',  (req, res) => {
	User.find().then((users) => {
		res.send({users})
	}, (error) => {
		res.status(400).send(error)
	})
})



app.post('/tables', (req, res) => {

    const table = new Table({
        location: req.body.location,
        floor: req.body.floor,
        description: req.body.description,
        numberOfSeats: req.body.numberOfSeats,
        start: req.body.start,
        end: req.body.end,
        subject: req.body.subject,
        users:req.body.users,
    });
	// save user to database
	table.save().then((result) => {
		res.send(table)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})

})

app.delete('/deleteUser', (req, res) => {
	const id = req.body.id

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findByIdAndRemove
	User.findByIdAndRemove(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send({ user })
		}
	}).catch((error) => {
		res.status(400).send(error)
	})
})


app.delete('/deleteTable', (req, res) => {
	const id = req.body.id

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findByIdAndRemove
	Table.findByIdAndRemove(id).then((table) => {
		if (!table) {
			res.status(404).send()
		} else {
			res.send({ table })
		}
	}).catch((error) => {
		res.status(400).send(error)
	})
})


app.post('/leave', (req, res) => {

            User.findById(req.session.user).then((user) => {
                Table.findById(user.table[0]._id).then((table1) => {
                    if (!table1) {
                        res.status(404).send()
                    } else {
                        let users = table1.users
                        users.splice(users.indexOf(user.name), 1)
                        let properties = { users }
                        Table.findByIdAndUpdate(user.table[0]._id, {$set: properties}, {new: true}).then((table1) => {
                            if (!table1) {
                                res.status(404).send()
                            } else {

                            }
                        }).catch((error) => {
                            res.status(400).send(error)
                        })}})


                let table = []
                let properties2 = {table}
                User.findByIdAndUpdate(req.session.user, {$set: properties2}, {new: true}).then((table1) => {
                    if (!table1) {
                        res.status(404).send()
                    } else {

                    }
                }).catch((error) => {
                    res.status(400).send(error)
                })
            })

})

app.post('/table', (req, res) => {

	Table.findById(req.body.id).then((table1) => {
		if (!table1) {
			res.status(404).send()
		} else {
			let users = table1.users
			users.push(req.session.name)
            let properties = { users }
            Table.findByIdAndUpdate(req.body.id, {$set: properties}, {new: true}).then((table1) => {
                if (!table1) {
                    res.status(404).send()
                } else {

                }
            }).catch((error) => {
                res.status(400).send(error)
            })

            User.findById(req.session.user).then((user) => {
                let table = user.table
                table.push(table1)
                let properties = {table}
                User.findByIdAndUpdate(req.session.user, {$set: properties}, {new: true}).then((table1) => {
                    if (!table1) {
                        res.status(404).send()
                    } else {
                        res.send(table1);

                    }
                }).catch((error) => {
                    res.status(400).send(error)
                })
            })

		}
	}).catch((error) => {
		res.status(400).send(error)
	})

})

app.post('/userTable', (req, res) => {

	const id = req.session.user
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			let table = user.table
            Table.findById(req.body.id).then((thisTable) => {
                if (!thisTable) {
                    res.status(404).send()
                } else {
                    table.push(thisTable)
                    let properties = { table }
                    User.findByIdAndUpdate(req.body.id, {$set: properties}, {new: true}).then((table) => {
                        if (!table) {
                            res.status(404).send()
                        } else {

                        }
                    }).catch((error) => {
                        res.status(400).send(error)
                    })

                }
            }).catch((error) => {
                res.status(400).send(error)
            })


		}
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});


