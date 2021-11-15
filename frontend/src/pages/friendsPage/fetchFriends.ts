import { BASE_API_URL } from "../..";

export interface friendData {
  username: string;
  id: string;
  email: string;
  isSentRequest: boolean;
}

interface fetchResponse {
  success: boolean;
  friends?: friendData[];
  error?: any;
}

const fetchFriendsList = async (authToken: string): Promise<fetchResponse> => {
  try {
    const response = await fetch(`${BASE_API_URL}/friends`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      return parsedResponse;
    }
    return { success: false };
  } catch (error) {
    return { success: false };
  }
};

export default fetchFriendsList;
