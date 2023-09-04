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
exports.generateToken = exports.validatePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @description - to hash and secure password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let saltRounds = 10;
        let hash = yield bcrypt_1.default.genSalt(saltRounds);
        let hashedPassword = yield bcrypt_1.default.hash(password, hash);
        return hashedPassword;
    }
    catch (e) {
        console.log(e);
    }
});
exports.hashPassword = hashPassword;
// @description - to decrypt and match password
const validatePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isPasswordCorrect = yield bcrypt_1.default.compare(password, hash);
        return isPasswordCorrect ? true : false;
    }
    catch (error) {
        console.log(error);
    }
});
exports.validatePassword = validatePassword;
// @description - to generate token for authorization
const generateToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRET, {
        expiresIn: '2h',
    });
    return token;
});
exports.generateToken = generateToken;
