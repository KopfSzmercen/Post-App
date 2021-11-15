import { registerFormErrors } from "./validation";
import { registerFormValues } from "./RegisterForm";
import { BASE_API_URL } from "../../..";

// interface registerResponse {
//   success: boolean;
//   errors?: {
//     email: string;
//     username: string;
//     password: string;
//     confirmPassword: string;
//   };
// }

export const submitRegisterForm = async (
  values: registerFormValues
): Promise<registerFormErrors | boolean> => {
  const requestBody = JSON.stringify(values);

  try {
    const response = await fetch(`${BASE_API_URL}/register`, {
      method: "POST",
      body: requestBody,
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response) return false;

    const parsedResponse: any = await response.json();
    if (parsedResponse.success) return true;

    const errors: any = {};
    for (const path in parsedResponse.errors) {
      errors[path] = parsedResponse.errors[path].message;
    }
    return errors as registerFormErrors;
  } catch (error) {
    console.log(error);
    return false;
  }
};
