"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var generateAuthToken = function (payload) {
    var authToken = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "10m"
    });
    return authToken;
};
exports.default = generateAuthToken;
