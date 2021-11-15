import { BASE_API_URL } from "../..";
interface response {
  success: boolean;
  error?: any;
}

const messageRequest = async (
  messageId: string,
  action: string,
  authToken: string
): Promise<response> => {
  const url = `${BASE_API_URL}/message/?messageId=${messageId}&action=${action}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    const err = error as response;
    return err;
  }
};

export default messageRequest;
