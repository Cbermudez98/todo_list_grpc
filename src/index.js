const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const dbConnection = require("./db/database");
const { SERVER } = require("./config/config");
const path = require("path");
const log = require("./helper/log");
const UserController = require("./user/controller/user.controller");
const validateSchema = require("./middleware/schemaValidator");
const { userCreateSchema, userLoginSchema } = require("./user/schema/user.schema");

dbConnection();

const PROTO_PATH_USER = path.join(process.cwd(), "protos/user.proto");

const loaderOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const package = protoLoader.loadSync(PROTO_PATH_USER, loaderOptions);

const grpcObj = grpc.loadPackageDefinition(package);

const server = new grpc.Server();

const userController = new UserController();

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


server.bindAsync(`127.0.0.1:${SERVER.PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    server.start();
    log.warn(`Listening on 127.0.0.1:${port}`);
});
