"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleModel = void 0;
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    scopes: [{ type: String }]
});
roleSchema.set("timestamps", true);
exports.roleModel = (0, mongoose_1.model)('Role', roleSchema);
