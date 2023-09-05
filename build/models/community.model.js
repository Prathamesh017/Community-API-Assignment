"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityModel = void 0;
const mongoose_1 = require("mongoose");
const communitySchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        ref: 'User',
        required: true,
    },
});
communitySchema.set("timestamps", true);
exports.communityModel = (0, mongoose_1.model)('Community', communitySchema);
