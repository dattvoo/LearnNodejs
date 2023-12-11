"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_schema_1 = __importDefault(require("../models/schemas/User.schema"));
const database_services_1 = __importDefault(require("./database.services"));
class UsersService {
    async register(payload) {
        const { email, password } = payload;
        const result = await database_services_1.default.users.insertOne(new User_schema_1.default({
            email,
            password,
        }));
        return result;
    }
}
const usersService = new UsersService();
exports.default = usersService;
