import { BASE_API_URL } from "../..";

export interface messageData {
  sender: string;
  senderName: string;
  receiver: string;
  action: string;
  text: string;
  createdAt: Date;
  _id: string;
}

interface fetchMessagesResult {
  success: boolean;
  messages?: messageData[];
  error?: any;
}

const fetchMessages = async (authToken: string) => {
  const result: fetchMessagesResult = { success: true };
  try {
    const response = await fetch(`${BASE_API_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    const parsedResponse: fetchMessagesResult = await response.json();
    return parsedResponse;
  } catch (error) {
    result.success = false;
    result.error = error;
    return result;
  }
};

export default fetchMessages;
