
const Joi = import('joi');
const Jpc = import('joi-password-complexity');
const mongoose = import('mongoose');

exports.User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 5,
        maxLength: 50,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 1,
        maxLength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 1,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 1,
        maxLength: 1024,
    }
}));

exports.validateUser = async function(user){
    const schema = {
        username: Joi.string().min(5).max(50).pattern("[ -~]").required(),
        name: Joi.string().min(1).max(50).pattern("[ -~]").required(),
        email: Joi.string().min(1).max(225).pattern("[ -~]").email().required(),
        password: Joi.string().min(1).max(255).pattern("[ -~]").required()
    }

    const {error} = Joi.validate(user, schema);
    if (error) return error;

    const passwordSchema = {
        min: 8,
        max: 255,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    };

    {error} Jpc(passwordSchema, "Password").validate(user.password);
    if (error) return error;

    return;
}