import { BASE_API_URL } from "../..";

export interface userData {
  username: string;
  id: string;
  email: string;
  isSentRequest: boolean;
}

interface fetchResponse {
  success: boolean;
  users?: userData[];
  error?: any;
}

const fetchUsers = async (authToken: string): Promise<fetchResponse> => {
  const result: fetchResponse = { success: true };
  try {
    const response = await fetch(`${BASE_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    const parsedResponse = await response.json();

    if (parsedResponse.success) return parsedResponse;
    // eslint-disable-next-line
    else throw { message: "fetching users failed" };
  } catch (error) {
    const err = error as any;
    result.success = false;
    if (err.message) result.error = err.message;
    else result.error = err;
    return result;
  }
};

export default fetchUsers;
