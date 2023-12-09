const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    done: {
        type: Boolean,
        require: false,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    versionKey: false,
    timestamps: true
});

const taskModel = model("tasks", taskSchema);

module.exports = taskModel;