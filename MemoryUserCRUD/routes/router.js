const express = require('express');
const router = express.Router();

let users = [
    { id: 1, name: 'Ahmed' }
];


// getAll
router.get('/', (req, res) => {
    res.json({ users });
});

// getById
router.get('/:id', (req, res) => {
    let id = +req.params.id;
    let user = users.find(ele => ele.id === id);

    if (user) return res.json({ user });

    //You Messed UP!
    res.status(404).send("User Not Found!");
});

// addUser
router.post('/add', (req, res) => {
    let newUser = req.body;

    if (!newUser || !newUser.name || !newUser.id) return res.status(400).send('Empty');

    // if user already exits
    let existingUser = users.find(ele => ele.id === newUser.id);

    if (existingUser) {
        res.status(409).send('User already exists');
    }

    users.push(newUser);
    res.status(201).send('Added it!');
});

//updateByID
router.put('/:id', (req, res) => {
    let id = +req.params.id;
    let indexOfTheUpdatedUser = users.findIndex(ele => ele.id === id);

    //You Messed UP!
    if (indexOfTheUpdatedUser === -1) return res.status(404).send("Not Found!");

    let newUserName = req.body?.name;

    //You Messed UP!
    if (!newUserName) return res.status(400).send('Empty');

    users[indexOfTheUpdatedUser].name = newUserName;
    ``
    res.status(201).json(users[indexOfTheUpdatedUser]);

});

// deleteUserByID
router.delete('/:id', (req, res) => {
    let id = +req.params.id;
    let indexdOfTheDeletedUser = users.findIndex(ele => ele.id === id);

    if (indexdOfTheDeletedUser === -1) return res.status(404).send('Not Found!');

    users.splice(indexdOfTheDeletedUser, 1)[0];
    res.json({ users });

});

module.exports = router;