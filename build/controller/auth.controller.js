"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const validator_1 = require("../validators/validator");
const utility_1 = require("../utility/utility");
const user_model_1 = require("../models/user.model");
// @api - v1/auth/signup POST
// @desc - register user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validator_1.userRegisterValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                "status": false,
                "message": error.message
            });
        }
        const { name, email, password } = req.body;
        const emailAlreadyExists = yield user_model_1.userModel.findOne({ email });
        if (emailAlreadyExists) {
            return res.status(409).json({
                "status": false,
                "message": "User Alreay Exists"
            });
        }
        const hashedPassword = yield (0, utility_1.hashPassword)(password);
        const user = new user_model_1.userModel({
            _id: yield (0, utility_1.IDGenerator)(),
            name,
            email,
            password: hashedPassword,
        });
        yield user.save();
        if (user) {
            let token = yield (0, utility_1.generateToken)(user.id);
            res.status(201).json({
                "status": true,
                "content": {
                    "data": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "created_at": user.createdAt,
                    },
                    "meta": {
                        "access_token": token
                    }
                }
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: 'failure',
            message: err.message,
        });
    }
});
exports.registerUser = registerUser;
// @api - v1/auth/signin POST
// @desc - login user
//@access - public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validator_1.userLoginValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                "status": false,
                "message": error.message
            });
        }
        const { email, password } = req.body;
        const user = yield user_model_1.userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                "status": false,
                "message": "User Not Found"
            });
        }
        const isPasswordCorrect = yield (0, utility_1.validatePassword)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                "status": false,
                "message": "Invalid Credentials"
            });
        }
        if (user) {
            let token = yield (0, utility_1.generateToken)(user.id);
            res.status(201).json({
                "status": true,
                "content": {
                    "data": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "created_at": user.createdAt
                    },
                    "meta": {
                        "access_token": token
                    }
                }
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: 'failure',
            message: err.message,
        });
    }
});
exports.loginUser = loginUser;
// @api - v1/auth/me  GET
// @desc - get authorized  user details
//@access - protected  requires token
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _id = req.user.id;
        const user = yield user_model_1.userModel.findOne({ _id }).select("-password");
        if (!user) {
            return res.status(404).json({
                "status": false,
                "message": "User Not Found"
            });
        }
        return res.status(200).json({
            "status": true,
            "content": {
                "data": user,
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 'failure',
            message: error.message,
        });
    }
});
exports.getMe = getMe;
