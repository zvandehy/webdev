const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: { type: String, required: [true, "Cannot be empty"] },
    lastName: { type: String, required: [true, "Cannot be empty"] },
    email: { type: String, required: [true, "Cannot be empty"], unique: true },
    password: { type: String, required: [true, "Cannot be empty"], },
});

//pre middleware

// hash the password
//before save happens, we want this callback function to occur
userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next;
    }
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(err));
});

// compare stored hash with provided password
userSchema.methods.comparePassword = function (loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}

module.exports = mongoose.model("User", userSchema) //db name "users"

