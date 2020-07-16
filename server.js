const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3001;

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@email.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '321',
            name: 'Richard',
            email: 'richard@email.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login : [
            {
                id: '987',
                hash: '',
                email: 'john@email.com'
            }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", '$2a$10$J77g/DwbIzXRwbdk9aA6oOUIvfZZVaQErS96gxWY3FxqQIzt6tF6G', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$J77g/DwbIzXRwbdk9aA6oOUIvfZZVaQErS96gxWY3FxqQIzt6tF6G', function(err, res) {
        console.log('second guess', res);
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
            res.json('succes');

        }else {
            res.status(400).json('failed');
        }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()        
    })

    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = true;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})

app.listen(port, () => {
    console.log('it works')
})



// Load hash from your password DB.



/*
  - res = this is working
  - signin --> POST = succes/fail
  - register --> POST = user
  - profile/:/userID --> GEt = user
  - image -- PUT --> user

*/ 