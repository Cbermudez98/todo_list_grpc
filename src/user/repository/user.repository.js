const log = require("../../helper/log.js");
const userModel = require("./../model/user.model.js");

class UserRepository {

    findUser(_id) {
        return new Promise((resolve, reject) => {
            userModel.findById(_id)
                .then((value) => resolve(value))
                .catch((error) => {
                    log.error(error);
                    reject(error);
                });
        });
    }

    findUserBy(query) {
        return new Promise((resolve, reject) => {
            userModel.findOne({ ...query })
                .then((value) => resolve(value))
                .catch((error) => {
                    log.error(error);
                    reject(error);
                });
        });
    }

    updateUser(id, user) {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(id, user)
                .then((value) => resolve(value))
                .catch((error) => {
                    log.error(error);
                    reject(error);
                });
        });
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            const newUser = new userModel(user);
            newUser.save()
                .then((data) => resolve(data))
                .catch((error) => {
                    log.error(error);
                    reject(error);
                });
        });
    }
}

module.exports = UserRepository;