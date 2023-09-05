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
exports.deleteMember = exports.createMember = void 0;
const member_model_1 = require("../models/member.model");
const utility_1 = require("../utility/utility");
const validator_1 = require("../validators/validator");
const community_model_1 = require("../models/community.model");
const user_model_1 = require("../models/user.model");
// @api v1/member POST
//@desc Create A Member
//@access protected requires token and scope based authorization
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validator_1.memberValidation.validate(req.body);
        let id = req.user.id;
        if (error) {
            return res.status(400).json({
                "status": false,
                "message": error.message
            });
        }
        const { community, role, user } = req.body;
        const communityDetails = yield community_model_1.communityModel.find({ _id: community });
        const userDetails = yield user_model_1.userModel.find({ _id: user });
        if (communityDetails.length === 0 || userDetails.length === 0) {
            return res.status(400).json({
                status: 'failure',
                message: "Invalid Data Provided",
            });
        }
        const { ownerId } = communityDetails[0];
        if (ownerId !== id) {
            return res.status(400).json({
                status: 'failure',
                message: "Only Owner Can Add Members",
            });
        }
        const member = yield (0, utility_1.createMemberFunc)(community, role, user);
        if (member) {
            res.status(201).json({
                "status": true,
                "content": {
                    "data": member,
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
exports.createMember = createMember;
// @api v1/member/:id DELETE
//@desc DELETE A Member
//@access protected requires token and scope based authorization
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const member = yield member_model_1.memberModel.findOne({ _id });
        if (!member) {
            return res.status(404).json({
                "status": false,
                "message": "Member Not Found"
            });
        }
        yield member_model_1.memberModel.findByIdAndDelete({ _id });
        return res.status(200).json({
            "status": true
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'failure',
            message: err.message,
        });
    }
});
exports.deleteMember = deleteMember;
