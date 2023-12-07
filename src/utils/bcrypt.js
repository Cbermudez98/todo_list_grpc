const { compareSync, hashSync, genSaltSync } = require("bcrypt");

const salt = genSaltSync(10);

const encrypt = data => {
    return hashSync(data, salt);
};

const compare = (plain, encrypted) => {
    return compareSync(plain, encrypted);
};

module.exports = { encrypt, compare };