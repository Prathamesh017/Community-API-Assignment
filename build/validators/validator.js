"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberValidation = exports.communityValidation = exports.roleValidation = exports.userLoginValidation = exports.userRegisterValidation = void 0;
const Joi = __importStar(require("joi"));
exports.userRegisterValidation = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
exports.userLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
exports.roleValidation = Joi.object({
    name: Joi.string().min(2).required(),
    scopes: Joi.array().items(Joi.string())
});
exports.communityValidation = Joi.object({
    name: Joi.string().min(2).required(),
});
exports.memberValidation = Joi.object({
    community: Joi.string().required(),
    user: Joi.string().required(),
    role: Joi.string().required(),
});
