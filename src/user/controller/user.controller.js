const UserRepository = require("../repository/user.repository");

class UserController {
    #userRepository = new UserRepository();
    constructor() {}

    async CreateUser(user) {
        try {
            const user = await this.#userRepository.createUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async Login(user) {
        try {
            const userDb = await this.#userRepository.findUserBy(user);
        } catch (error) {
            
        }
    }
}