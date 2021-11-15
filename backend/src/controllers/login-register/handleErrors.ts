import { registerResult } from "../../models/user/register";

const handleErrors = (result: registerResult) => {
  const formattedError: registerResult = { success: result.success };

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

export default handleErrors;
