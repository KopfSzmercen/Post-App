"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var limiter = express_rate_limit_1.default({
    windowMs: 15 * 60 * 1000,
    max: 200
});
exports.default = limiter;
