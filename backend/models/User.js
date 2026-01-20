const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema

const UserSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
})

UserSchema.statics.register = async function (name, email, password,phone, confirmPassword) {
    const userExist = await this.findOne({ email });
    if (userExist) {
        throw new Error("User is already existed.");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match!.")
    }

    const salt = await bcrypt.genSalt();
    const hashValue = await bcrypt.hash(password, salt);

    const UserInfo = await this.create({
        name,
        email,
        password: hashValue,
        phone
    });

    return UserInfo;
};

UserSchema.statics.login = async function (email, password) {
    const userExist = await this.findOne({ email });
    if (!userExist) {
        throw new Error("User is not existed.");
    }
    const isMatchPassword = await bcrypt.compare(password, userExist.password);
    if (!isMatchPassword) {
        throw new Error("Password is not matched. Please try again!");
    }

    return userExist;
};

module.exports = mongoose.model("User", UserSchema)