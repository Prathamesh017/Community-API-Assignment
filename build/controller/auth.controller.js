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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const validator_1 = __importDefault(require("../validators/validator"));
const utility_1 = require("../utility/utility");
const utility_2 = require("../utility/utility");
const user_model_1 = require("../models/user.model");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validator_1.default.validate(req.body);
        if (error) {
            return res.status(400).json({
                "status": false,
                "message": error.message
            });
        }
        const { name, email, password } = req.body;
        const hashedPassword = yield (0, utility_1.hashPassword)(password);
        console.log(name, email, password, hashedPassword);
        const user = new user_model_1.userModel({
            name,
            email,
            password: hashedPassword,
        });
        yield user.save();
        if (user) {
            let token = yield (0, utility_2.generateToken)(user.id);
            res.status(201).json({
                "status": true,
                "content": {
                    "data": {
                        user,
                    },
                    "meta": {
                        "access_token": token
                    }
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            status: 'failure',
            message: err.message,
        });
    }
});
exports.registerUser = registerUser;
