const TaskRepository = require("./../repository/task.repository");

class TaskController {
    #taskRepository = new TaskRepository();
    constructor() {}

    async createTask(task) {
        try {
            return await this.#taskRepository.createTask(task);
        } catch (error) {
            throw error;
        }
    }

    async getTask(_id) {
        try {
            return await this.#taskRepository.getTask(_id);
        } catch (error) {
            throw error;
        }
    }

    async getTasks(_id) {
        try {
            return await this.#taskRepository.getTasks(_id);
        } catch (error) {
            throw error;
        }
    }

    async updateTask(_id, task) {
        try {
            return await this.#taskRepository.updateTask(_id, task);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TaskController;