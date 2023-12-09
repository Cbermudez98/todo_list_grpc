const Joi = require("joi");

const title = Joi.string();
const description = Joi.string();
const done = Joi.boolean();

const taskSchemaCreate = Joi.object({
    title: title.required(),
    description: description.required(),
});

const taskSchemaUpdate = Joi.object({
    title,
    description,
    done
});

module.exports = { taskSchemaCreate, taskSchemaUpdate };