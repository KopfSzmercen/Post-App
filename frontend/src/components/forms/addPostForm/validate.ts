import { isLength } from "../../../validation/inputValidationFunctions";
import { addPostValues } from "./AddPostForm";

interface postErrors {
  title?: string | undefined;
  description?: string | undefined;
}

const validateAddPost = (values: addPostValues) => {
  const errors: postErrors = {};
  if (!isLength(values.title, 5, 20)) {
    errors.title = "Title has to be between 5 and 20 characters long";
  }

  if (!isLength(values.description, 5)) {
    errors.description = "Description should be at least 5 characters long";
  }
  return errors;
};

export default validateAddPost;
