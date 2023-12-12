"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const User_schema_1 = __importDefault(require("../models/schemas/User.schema"));
const users_services_1 = __importDefault(require("../services/users.services"));
const registerController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            message: 'Email or Password not valid',
        });
    }
    try {
        const result = await users_services_1.default.register(new User_schema_1.default({ email, password }));
        return res.json({
            message: 'Register success',
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            error: 'Register failed',
        });
    }
};
exports.registerController = registerController;
