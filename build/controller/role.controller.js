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
exports.getAllRoles = exports.createRole = void 0;
const validator_1 = require("../validators/validator");
const role_model_1 = require("../models/role.model");
const utility_1 = require("../utility/utility");
// @api v1/role POST
//@desc Create A Role
//@access public
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validator_1.roleValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                "status": false,
                "message": error.message
            });
        }
        const { name, scopes } = req.body;
        const role = new role_model_1.roleModel({
            _id: yield (0, utility_1.IDGenerator)(),
            name,
            scopes,
        });
        yield role.save();
        if (role) {
            return res.status(201).json({
                "status": true,
                "content": {
                    "data": {
                        "id": role.id,
                        "name": role.name,
                        "created_at": role.createdAt,
                        "updated_at": role.updatedAt,
                    },
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
exports.createRole = createRole;
// @api v1/role POST
//@desc Get all Roles
//@access public
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1; // Current page (default to 1)
        const perPage = parseInt(req.query.perPage) || 5; // 5 roles per page default
        const roles = yield role_model_1.roleModel.find({}).skip((page - 1) * perPage)
            .limit(perPage);
        ;
        if (!roles) {
            return res.status(404).json({
                "status": false,
                "message": "Roles Not Found"
            });
        }
        const meta = {
            total: roles.length,
            pages: Math.ceil(roles.length / perPage),
            page: page,
        };
        return res.status(200).json({
            "status": true,
            "content": {
                meta,
                "data": roles,
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
exports.getAllRoles = getAllRoles;
