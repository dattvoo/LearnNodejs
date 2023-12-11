"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_services_1 = __importDefault(require("./services/database.services"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
const port = 8080;
app.use(body_parser_1.default.json());
app.get('/', (res, req) => {
    return req.json({
        message: 'Heeeellooooooo',
    });
});
app.use('/auth', users_routes_1.default);
database_services_1.default.connect();
app.listen(port, () => {
    console.log(`App is listenning on port:${port}`);
});
