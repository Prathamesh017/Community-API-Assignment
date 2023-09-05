"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberModel = void 0;
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    roleId: {
        type: String,
        ref: 'Role',
        required: true,
    },
    communityId: {
        type: String,
        ref: 'Community',
        required: true,
    }
});
memberSchema.set("timestamps", true);
exports.memberModel = (0, mongoose_1.model)('Member', memberSchema);
