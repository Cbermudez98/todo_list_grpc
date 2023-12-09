const Joi = require("joi");

const name = Joi.string();
const last_name = Joi.string();
const email = Joi.string().email();
const password = Joi.string();

const userCreateSchema = Joi.object({
    name: name.required(),
    last_name: last_name.required(),
    email: email.required(),
    password: password.required()
});

const userLoginSchema  = Joi.object({
    email: email.required(),
    password: password.required()
});

module.exports = { userCreateSchema, userLoginSchema };