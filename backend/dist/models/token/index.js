"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tokenSchema = new mongoose_1.Schema({
    value: { type: String }
}, { timestamps: true });
var Token = mongoose_1.model("Token", tokenSchema);
exports.default = Token;
