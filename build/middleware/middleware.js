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
exports.authorizeScope = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const member_model_1 = require("../models/member.model");
const role_model_1 = require("../models/role.model");
const verifyToken = (req, res, next) => {
    const SECRET_KEY = process.env.SECRET;
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res
                .status(403)
                .json({ message: 'A token is required for authentication' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.user = decoded;
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({ message: 'No Authorization' });
        }
    }
    else {
        return res.status(401).json({ message: 'No Authorization, No Token' });
    }
};
const authorizeScope = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let id = req.user.id;
            let member = yield member_model_1.memberModel.findOne({ userId: id });
            if (!member) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            let roles = yield role_model_1.roleModel.findOne({ _id: member.roleId });
            if (!roles) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (!roles.scopes.includes(role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                next();
            }
        }
        catch (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }
    });
};
exports.authorizeScope = authorizeScope;
exports.default = verifyToken;
