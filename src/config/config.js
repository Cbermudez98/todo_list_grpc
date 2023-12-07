const { config } = require("dotenv");
config();

module.exports = {
    DATABASE: {
        HOST: process.env.DATABASE_HOST,
        NAME: process.env.DATABASE,
        PORT: process.env.DATABASE_PORT
    },
    SERVER: {
        PORT: process.env.SERVER_PORT
    },
    JWT: {
        SECRET: process.env.JWT_PRIVATE_KEY
    }
}