"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const community_controller_1 = require("../controller/community.controller");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const communityRouter = (0, express_1.Router)();
communityRouter.get("/me/members", middleware_1.default, community_controller_1.getAllCommunityJoinedByme).get("/:id/members", community_controller_1.getAllMembersOfACommunity).post('/', middleware_1.default, community_controller_1.createCommunity).get("/", community_controller_1.getAllCommunities).get("/me/owner", middleware_1.default, community_controller_1.getMyCommunity);
exports.default = communityRouter;
