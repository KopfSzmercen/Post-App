import { loginFormValues } from "./LoginForm";
import { loginFormErrors } from "./validation";
import { BASE_API_URL } from "../../..";

interface loginResponse extends loginFormErrors {
  success: boolean;
  authToken?: string;
  refreshToken?: string;
  username?: string;
  userId?: string;
  messagesNumber?: number;
}

const submitLoginForm = async (
  values: loginFormValues
): Promise<loginResponse> => {
  const body = JSON.stringify(values);

  try {
    const response = await fetch(`${BASE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });

    if (!response) return { success: false };

    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      return { success: true, ...parsedResponse };
    }

    const errors: any = { success: false };
    for (const path in parsedResponse.errors) {
      errors[path] = parsedResponse.errors[path].message;
    }
    return errors as loginResponse;
  } catch (errors) {
    return { success: false };
  }
};

export default submitLoginForm;
