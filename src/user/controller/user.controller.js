const log = require("../../helper/log");
const { encrypt, compare } = require("../../utils/bcrypt");
const { singToken } = require("../../utils/jwt");
const UserRepository = require("../repository/user.repository");

class UserController {
    #userRepository = new UserRepository();
    constructor() {}

    async CreateUser(user) {
        try {
            const password = encrypt(user.password);
            const newUser = await this.#userRepository.createUser({ ...user, password });
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async Login(user) {
        try {
            const userDb = await this.#userRepository.findUserBy({ email: user.email });
            log.info(userDb);
            const isValid = compare(user.password, userDb.password);
            if (!isValid) {
                throw new Error("Password is not valid");
            }
            const token = singToken({ _id: userDb._id });
            return { token };
        } catch (error) {
            log.error(error);
            throw error;
        }
    }
}

module.exports = UserController;