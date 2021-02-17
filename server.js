/*
 * @Test = npm run devStart
 *
 * @express
 * @PORT = 3000
 */

const express = require('express');
const app     = express();
// Require BCrypt for hashing the Passwords
const bcrypt  = require('bcrypt');

// Set the View Engine to use ejs libary (see package.json)
app.set('view-engine', 'ejs');

// Make our app work with JSON
// app.use(express.json());

// Import User Classes
const User    = require('./classTesting.js')

// Create 2 new Users
let user1 = new User("Rico", "Rosenkrans", 24, "Brun");
let user2 = new User("Malika", "Rosenkrans");

// Save the Users in an array
let users = [user1,user2];


/**======================
 * ROUTES
 ========================*/

// Creating Route for Frontpage
app.get('/', (req, res) => {
    res.render('index.ejs', {
        fullname: user1.fullName(),
        age: user1.age,
        eye: user1.eye
    });
});

// Creating Route for Login
app.get('/login', (req, res) => {
    res.render('login.ejs');
});

// Creating Route for Registering
app.get('/register', (req, res) => {
    res.render('register.ejs');
});

// Creating Route for /users
app.get('/users', (req, res) => {
    res.json(users);
});

// Creating new User
app.post('/users', async (req, res) => {
    try {
        // Generate a new Salt for the Password
        const salt = await bcrypt.genSalt();
        // Find our regular Password and apend the Salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);

        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword
        }
        // Push the new User to the users array above
        users.push(user);
        res.status(201).send(); 
    } catch {
        res.status(500).send();
    }
})

// Login User
app.post('/users/login', async (req,res) => {
    const user = users.find(user => user.firstname === req.body.firstname);
    if (user == null) {
        return res.status(400).send('Cannot find user.');
    }  
    try {
        // Compare IF the regular and hashed passwords are the same
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Succes');
        } else {
            res.send('Not allowed');
        }
    } catch {
        res.status(500).send(); 
    }
})


app.listen(3000);