const { connect } = require("mongoose");
const { DATABASE } = require("../config/config");
const log = require("../helper/log");

const dbConnection = () => {
    const uri = `mongodb://${DATABASE.HOST}:${DATABASE.PORT}/${DATABASE.NAME}`;
    console.log("🚀  ~ file: database.js:8 ~ dbConnection ~ uri:", uri);
    connect(uri).then(() => {
        log.info("Database connected successfully")
    }).catch((error) => {
        log.error("Error connecting to database", error);
    });
};

module.exports = dbConnection;