import {
  isEmail,
  isLength
} from "../../../validation/inputValidationFunctions";
import { loginFormValues } from "./LoginForm";

export interface loginFormErrors {
  email?: string | undefined;
  password?: string | undefined;
}

const validateLoginForm = (values: loginFormValues) => {
  const loginFormErrors: loginFormErrors = {};

  if (!isEmail(values.email)) {
    loginFormErrors.email = "Please enter a valid email";
  }

  if (!isLength(values.password, 5, 15)) {
    loginFormErrors.password = "Invalid password";
  }
  return loginFormErrors;
};

export default validateLoginForm;
