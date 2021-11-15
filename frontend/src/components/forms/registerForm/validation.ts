import { registerFormValues } from "./RegisterForm";

import {
  isEmail,
  isLength
} from "../../../validation/inputValidationFunctions";

export interface registerFormErrors {
  email?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

const registerFormValidationFunction = (
  values: registerFormValues
): registerFormErrors => {
  const errors: registerFormErrors = {};

  if (!isEmail(values.email)) errors.email = "Please enter a valid email";
  if (!isLength(values.username, 5, 15)) {
    errors.username = "Username has to be between 5 and 15 characters long.";
  }
  if (!isLength(values.password, 5, 15)) {
    errors.password = "Password has to be between 5 and 15 characters long.";
  }

  if (!errors.password && values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords have to march.";
  }

  return errors;
};

export default registerFormValidationFunction;
