const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const dbConnection = require("./db/database");
const { SERVER } = require("./config/config");
const path = require("path");
const log = require("./helper/log");

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

server.addService(grpcObj.UserService.service, {
    
});


server.bindAsync(`127.0.0.1:${SERVER.PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    server.start();
    log.warn(`Listening on 127.0.0.1:${port}`);
});
