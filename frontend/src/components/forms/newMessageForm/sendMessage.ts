import { BASE_API_URL } from "../../..";

interface result {
  success: boolean;
  error?: any;
}
const sendMessage = async (
  authToken: string,
  receiverId: string,
  messageText: string
) => {
  const body = JSON.stringify({
    receiver: receiverId,
    action: "TEXT_MESSAGE",
    text: messageText
  });
  try {
    const response = await fetch(`${BASE_API_URL}/sendMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: body
    });
    const parsedResponse: result = await response.json();

    return parsedResponse;
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};

export default sendMessage;
