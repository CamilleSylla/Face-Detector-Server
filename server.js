const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json())

const port = 3000;

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@email.com',
            password: 'great',
            entries: 0,
            joined: new Date()
        },
        {
            id: '321',
            name: 'Richard',
            email: 'richard@email.com',
            password: 'smoke',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
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

app.listen(port, () => {
    console.log('it works')
})


/*
  - res = this is working
  - signin --> POST = succes/fail
  - register --> POST = user
  - profile/:/userID --> GEt = user
  - image -- PUT --> user

*/ 