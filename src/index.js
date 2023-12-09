const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const dbConnection = require("./db/database");
const { SERVER } = require("./config/config");
const path = require("path");
const log = require("./helper/log");
const UserController = require("./modules/user/controller/user.controller");
const TaskController = require("./modules/task/controller/task.controller");
const validateSchema = require("./middleware/schemaValidator");
const { userCreateSchema, userLoginSchema } = require("./modules/user/schema/user.schema");
const { taskSchemaCreate, taskSchemaUpdate } = require("./modules/task/schema/task.schema");

dbConnection();

const PROTO_PATH_USER = path.join(process.cwd(), "protos/user.proto");
const PROTO_PATH_TASK = path.join(process.cwd(), "protos/task.proto");

const loaderOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const package = protoLoader.loadSync(PROTO_PATH_USER, loaderOptions);
const packageTask = protoLoader.loadSync(PROTO_PATH_TASK, loaderOptions);

const grpcObj = grpc.loadPackageDefinition(package);
const grpcObjTask = grpc.loadPackageDefinition(packageTask);

const server = new grpc.Server();

const userController = new UserController();
const taskController = new TaskController();

server.addService(grpcObj.UserService.service, {
    CreateUSer: 
    async (call, callback) => {
        try {
            const isValid = validateSchema(userCreateSchema)(call.request);
            if (!isValid) {
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    details: "Invalid schema"
                })
            }
            const response = await userController.CreateUser(call.request);
            callback(null, response);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error?.message || "Internal server error"
            })
        }
    },
    Login: async (call, callback) => {
        try {
            const isValid = validateSchema(userLoginSchema)(call.request);
            if (!isValid) {
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    details: "Invalid schema"
                })
            }
            const response = await userController.Login(call.request);
            callback(null, response);
        } catch (error) {
            log.error(error);
            callback({
                code: grpc.status.INTERNAL,
                details: error?.message || "Internal server error"
            })
        }
    }
});

server.addService(grpcObjTask.TaskService.service, {
    CreateTask: async (call, callback) => {
        try {
            const isValid = validateSchema(taskSchemaCreate)(call.request);
            if (!isValid) {
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    details: "Invalid schema"
                })
            }
            // TODO: Complete this function, get user and complete the save
            const task = { ...call.request,  };
            const response = await taskController.createTask();
        } catch (error) {
            
        }
    }
});


server.bindAsync(`127.0.0.1:${SERVER.PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    server.start();
    log.warn(`Listening on 127.0.0.1:${port}`);
});
