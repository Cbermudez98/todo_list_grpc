const { sign, verify } = require("jsonwebtoken");
const { JWT } = require("../config/config");

const singToken = (data) => {
    return sign(data, JWT.SECRET, { expiresIn: "24h" });
}

const verifyToken = (token) => {
    return verify(token, JWT.SECRET);
}

module.exports = { singToken, verifyToken };