import { addPostResult } from "../../models/post/index";

interface formattedErrors {
  success: boolean;
  errors?: {
    title?: string;
    description?: string;
    exeption?: string;
  };
}

const handlePostErrors = (result: addPostResult) => {
  const formattedErrors: formattedErrors = { success: true };
  if (result.error) {
    formattedErrors.success = false;
    formattedErrors.errors = {};
    if (result.error.errors.title) {
      formattedErrors.errors.title = result.error.errors.title.message;
    }
    if (result.error.errors.description) {
      formattedErrors.errors.description =
        result.error.errors.description.message;
    }
    if (result.error.errors.exeption) {
      formattedErrors.errors.exeption = result.error.errors.exeption.message;
    }
  }
  return formattedErrors;
};

export default handlePostErrors;
