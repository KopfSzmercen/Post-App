import Message from "../message";

interface getMessagesResult {
  success: boolean;
  messages?: Message[];
  error?: any;
}

const getMessages = async (userId: string) => {
  const result: getMessagesResult = { success: true };
  try {
    const messages = await Message.find({ receiver: userId });
    result.messages = messages;
    return result;
  } catch (error) {
    result.success = false;
    result.error = error;
    return result;
  }
};

export default getMessages;
