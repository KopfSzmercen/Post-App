import { BASE_API_URL } from "../..";

interface sendResult {
  success: boolean;
  error?: any;
}
const sendInvitation = async (authToken: string, receiver: string) => {
  const result: sendResult = { success: true };
  const payload = { receiver, action: "ADD_FRIEND" };
  try {
    const response = await fetch(`${BASE_API_URL}/sendMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const parsedResponse = await response.json();
    if (parsedResponse.success) return result;
    else {
      result.success = false;
      if (parsedResponse.error) result.error = parsedResponse.error;
      return result;
    }
  } catch (error) {
    result.success = false;
    result.error = error;
    return result;
  }
};

export default sendInvitation;
