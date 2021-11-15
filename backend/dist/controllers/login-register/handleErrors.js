"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleErrors = function (result) {
    var formattedError = { success: result.success };
    if (result.errors) {
        formattedError.errors = {};
        if (result.errors.username) {
            formattedError.errors.username = {
                message: result.errors.username.message
            };
        }
        if (result.errors.email) {
            formattedError.errors.email = {
                message: result.errors.email.message
            };
        }
        if (result.errors.password) {
            formattedError.errors.password = {
                message: result.errors.password.message
            };
        }
        if (result.errors.confirmPassword) {
            formattedError.errors.confirmPassword = {
                message: result.errors.confirmPassword.message
            };
        }
    }
    return formattedError;
};
exports.default = handleErrors;
