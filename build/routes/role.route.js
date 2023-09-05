"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controller/role.controller");
const roleRouter = (0, express_1.Router)();
roleRouter.get("/", role_controller_1.getAllRoles)
    .post('/', role_controller_1.createRole);
exports.default = roleRouter;
