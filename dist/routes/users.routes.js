"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const usersRouter = (0, express_1.Router)();
usersRouter.post('/register', users_controller_1.registerController);
exports.default = usersRouter;
