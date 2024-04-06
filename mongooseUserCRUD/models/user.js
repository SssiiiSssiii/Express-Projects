const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let user = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

user.methods.compare = async function (guess) {
    let ok = await bcrypt.compare(guess, this.password);
    return ok;
}

const User = mongoose.model('User', user);

module.exports = User;