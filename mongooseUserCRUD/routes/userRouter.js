const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//get all users
router.get('/', async (req, res) => {
    res.json(await User.find({}, { __v: false, password: false }));
})

//getByID
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ Error: "Not Found" });

    let user = await User.findById({ _id: id }, { __v: false, password: false });
    res.json({ user });
})


//createUser
router.post('/register', async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ Error: "Empty!" });


    let isExist = await User.findOne({ email });

    if (isExist) return res.status(409).json({ Error: ('User already exists') });

    //hashing

    let hashedPassword = await bcrypt.hash(password, +process.env.SALT);

    let newUser = new User({
        email,
        password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ status: 'Registerd!' });
})

//update userEmail by ID
router.put('/:id', async (req, res) => {
    let userId = req.params.id;
    let newEmail = req.body;

    if (!mongoose.isValidObjectId(userId)) return res.status(404).json({ msg: "Not Found!" });

    let user = await User.findByIdAndUpdate({ _id: userId }, { $set: { email: newEmail.email } });

    if (!user) return res.status(404).json({ msg: "Not Found!" });

    res.json({ msg: "Done!" });
});

router.delete('/:id', async (req, res) => {
    let userId = req.params.id;
    let user = undefined;

    if (mongoose.isValidObjectId(userId))
        user = await User.findByIdAndDelete({ _id: userId });

    if (!mongoose.isValidObjectId(userId) || !user) return res.status(404).json({ Error: 'Not Found' });

    res.json({ msg: "Done!" });
})

router.post('/login', async (req, res) => {
    const { password, email } = req.body;
    let user = await User.findOne({ email })

    if (!user) return res.status(404).json({ ERROR: 'NOT FOUND!' });

    let ok = await user.compare(password);

    if (!ok)
        return res.status(401).json({ ERROR: "الأندر تيكر مش عاجبه الكلام دا" });

    res.json({ msg: "عدي يا معلم" })
});

module.exports = router;