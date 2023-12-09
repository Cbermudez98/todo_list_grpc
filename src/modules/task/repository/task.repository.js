const taskModel = require("./../model/task.model");

class TaskRepository {
    createTask(task) {
        return new Promise((resolve, reject) => {
            const newTask = new taskModel(task);
            newTask.save()
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }

    getTask(_id) {
        return new Promise((resolve, reject) => {
            taskModel.findById(_id)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }

    getTasks(_id) {
        return new Promise((resolve, reject) => {
            taskModel.find({ _id })
                .populate("user")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }

    updateTask(_id, task) {
        return new Promise((resolve, reject) => {
            taskModel.findByIdAndUpdate(_id, task)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
}

module.exports = TaskRepository;