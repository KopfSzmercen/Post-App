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
var bcrypt_1 = __importDefault(require("bcrypt"));
var index_1 = __importDefault(require("./index"));
var generateTokens_1 = require("../../auth/generateTokens");
var validator_1 = __importDefault(require("validator"));
var login = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user_1, passwordsDoMatch, tokenPayload, authToken, refreshToken, messagesNumber_1, error_1, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = data.email, password = data.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!email) {
                    throw { email: { message: "Please enter an email" } };
                }
                if (!validator_1.default.isEmail(email))
                    throw { email: { message: "Please enter a valid email" } };
                if (!password)
                    throw { password: { message: "Please enter a password" } };
                if (!validator_1.default.isLength(password, { min: 5, max: 15 }))
                    throw {
                        email: {
                            message: "Password has to be between 5 and 15 characters long"
                        }
                    };
                return [4 /*yield*/, index_1.default.findOne({ email: email }).populate("messages")];
            case 2:
                user_1 = _a.sent();
                if (!user_1) {
                    throw { email: { message: "No user with this email" } };
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user_1.password)];
            case 3:
                passwordsDoMatch = _a.sent();
                if (!passwordsDoMatch)
                    throw { password: { message: "Invalid password" } };
                tokenPayload = { userId: user_1._id, username: user_1.username };
                authToken = generateTokens_1.generateAuthToken(tokenPayload);
                return [4 /*yield*/, generateTokens_1.generateRefreshToken(tokenPayload)];
            case 4:
                refreshToken = _a.sent();
                messagesNumber_1 = 0;
                user_1.messages.forEach(function (message) {
                    if (message.receiver[0].toString() == user_1._id.toString())
                        messagesNumber_1++;
                });
                return [2 /*return*/, {
                        success: true,
                        refreshToken: refreshToken,
                        authToken: authToken,
                        currentUserName: user_1.username,
                        userId: user_1._id,
                        messagesNumber: messagesNumber_1
                    }];
            case 5:
                error_1 = _a.sent();
                errors = error_1;
                return [2 /*return*/, { success: false, errors: errors }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = login;
