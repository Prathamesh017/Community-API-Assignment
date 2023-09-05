"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const authRouter = (0, express_1.Router)();
authRouter
    .post('/signup', auth_controller_1.registerUser)
    .post('/signin', auth_controller_1.loginUser)
    .get("/me", middleware_1.default, auth_controller_1.getMe);
exports.default = authRouter;
