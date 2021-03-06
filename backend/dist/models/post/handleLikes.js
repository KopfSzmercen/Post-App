"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var index_2 = __importDefault(require("../user/index"));
var handleLikes = function (postId, userId, action) { return __awaiter(void 0, void 0, void 0, function () {
    var result, user, post, newLikesNumber, error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = { success: true };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                return [4 /*yield*/, index_2.default.findOne({ _id: userId })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, index_1.default.findOne({ _id: postId })];
            case 3:
                post = _a.sent();
                if (!user)
                    throw { user: "User requesting not found" };
                if (!post)
                    throw { post: "Post with this id doesn't exist" };
                newLikesNumber = post.likes.length;
                if (!(action === "LIKE")) return [3 /*break*/, 6];
                return [4 /*yield*/, user.updateOne({ $push: { likedPosts: postId } })];
            case 4:
                _a.sent();
                return [4 /*yield*/, post.updateOne({ $push: { likes: userId } })];
            case 5:
                _a.sent();
                newLikesNumber++;
                return [3 /*break*/, 10];
            case 6:
                if (!(action === "DISLIKE")) return [3 /*break*/, 9];
                return [4 /*yield*/, user.updateOne({ $pull: { likedPosts: postId } })];
            case 7:
                _a.sent();
                return [4 /*yield*/, post.updateOne({ $pull: { likes: userId } })];
            case 8:
                _a.sent();
                newLikesNumber--;
                return [3 /*break*/, 10];
            case 9: throw { action: "Invalid action" };
            case 10: return [2 /*return*/, __assign(__assign({}, result), { newLikesNumber: newLikesNumber })];
            case 11:
                error_1 = _a.sent();
                err = error_1;
                result.success = false;
                result.errors = __assign({}, err);
                return [2 /*return*/, result];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.default = handleLikes;
