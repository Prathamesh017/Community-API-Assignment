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
exports.getAllCommunityJoinedByme = exports.getAllMembersOfACommunity = exports.getMyCommunity = exports.getAllCommunities = exports.createCommunity = void 0;
const validator_1 = require("../validators/validator");
const utility_1 = require("../utility/utility");
const community_model_1 = require("../models/community.model");
const role_model_1 = require("../models/role.model");
const member_model_1 = require("../models/member.model");
// @api-  v1/community POST
//@desc - create Community
//@access - protected  requires token
const createCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.user.id;
        const { error } = validator_1.communityValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                "status": false,
                "message": error.message
            });
        }
        const { name } = req.body;
        const community = new community_model_1.communityModel({
            _id: yield (0, utility_1.IDGenerator)(),
            name,
            slug: (0, utility_1.createSlug)(name),
            ownerId: id,
        });
        yield community.save();
        if (community) {
            const adminRole = yield role_model_1.roleModel.findOne({ name: "Community Admin" }).select("id");
            if (adminRole) {
                yield (0, utility_1.createMemberFunc)(community.id, adminRole.id, id);
            }
            res.status(200).json({
                "status": true,
                "content": {
                    "data": community,
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
exports.createCommunity = createCommunity;
// @api-  v1/community GET
//@desc - get all Communites
//@access - public 
const getAllCommunities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1; // Current page (default to 1)
        const perPage = parseInt(req.query.perPage) || 5; // 5 communites per page default
        const allCommunities = yield community_model_1.communityModel.find({}).skip((page - 1) * perPage)
            .limit(perPage).populate({
            path: 'ownerId',
            select: 'id name'
        });
        const meta = {
            total: allCommunities.length,
            pages: Math.ceil(allCommunities.length / perPage),
            page: page,
        };
        return res.status(200).json({
            "status": true,
            "content": {
                meta,
                "data": allCommunities,
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
exports.getAllCommunities = getAllCommunities;
// @api-  v1/community/me/owner GET
//@desc - get all loggedUser Communites
//@access - protected requires token
const getMyCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.user.id;
        const page = parseInt(req.query.page) || 1; // Current page (default to 1)
        const perPage = parseInt(req.query.perPage) || 5; // 5 communites per page default
        const myCommunities = yield community_model_1.communityModel.find({ ownerId: id }).skip((page - 1) * perPage)
            .limit(perPage);
        const meta = {
            total: myCommunities.length,
            pages: Math.ceil(myCommunities.length / perPage),
            page: page,
        };
        return res.status(200).json({
            "status": true,
            "content": {
                meta,
                "data": myCommunities,
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
exports.getMyCommunity = getMyCommunity;
// @api-  v1/community/:id/members GET
//@desc - get all members of a  Community
//@access - public
const getAllMembersOfACommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const page = parseInt(req.query.page) || 1; // Current page (default to 1)
        const perPage = parseInt(req.query.perPage) || 5;
        const membersList = yield member_model_1.memberModel.find({ communityId: id }).skip((page - 1) * perPage)
            .limit(perPage).populate({
            path: 'userId',
            select: 'id name'
        }).populate({
            path: 'roleId',
            select: 'id name'
        });
        const meta = {
            total: membersList.length,
            pages: Math.ceil(membersList.length / perPage),
            page: page,
        };
        return res.status(200).json({
            "status": true,
            "content": {
                meta,
                "data": membersList,
            }
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'failure',
            message: err.message,
        });
    }
});
exports.getAllMembersOfACommunity = getAllMembersOfACommunity;
// @api-  v1/community/me/members GET
//@desc - get all communities joined logged in user
//@access - protected access token
const getAllCommunityJoinedByme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.user.id;
        const page = parseInt(req.query.page) || 1; // Current page (default to 1)
        const perPage = parseInt(req.query.perPage) || 5;
        const communityIds = yield member_model_1.memberModel.find({ userId: id }).select({ _id: false, communityId: true });
        const communtiyIdsArray = communityIds.map((community) => { return community.communityId; });
        const communityList = yield community_model_1.communityModel.find({ _id: { $in: communtiyIdsArray } }).skip((page - 1) * perPage)
            .limit(perPage).populate({
            path: 'ownerId',
            select: 'id name'
        });
        const meta = {
            total: communityList.length,
            pages: Math.ceil(communityList.length / perPage),
            page: page,
        };
        return res.status(200).json({
            "status": true,
            "content": {
                meta,
                "data": communityList,
            }
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'failure',
            message: err.message,
        });
    }
});
exports.getAllCommunityJoinedByme = getAllCommunityJoinedByme;
