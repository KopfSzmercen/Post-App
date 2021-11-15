import { protectedRoutePayload } from "../../auth/authMiddleware";
import { protectedRouteLocals } from "../../auth/authMiddleware";
import { sendMessageResult } from "../../models/message/index";
import Message from "../../models/message/index";

interface sendMessagePayload extends protectedRoutePayload {
  body: {
    receiver: string;
    action: string;
    text: string;
    authToken?: string;
    refreshToken: string;
  };
}

interface formattedResult {
  success: boolean;
  errors?: {
    sender?: string;
    receiver?: string;
    exeption?: string;
    action?: string;
  };
}

const handleSendMessageResponse = (result: sendMessageResult) => {
  const formattedResult: formattedResult = { success: true };
  if (result.error) {
    formattedResult.success = false;
    formattedResult.errors = {};
    if (result.error.errors.sender) {
      formattedResult.errors.sender = result.error.errors.sender.message;
    }
    if (result.error.errors.receiver) {
      formattedResult.errors.receiver = result.error.errors.receiver.message;
    }
    if (result.error.errors.exeption) {
      formattedResult.errors.exeption = result.error.errors.exeption.message;
    }
    if (result.error.errors.action) {
      formattedResult.errors.action = result.error.errors.action.message;
    }
  }
  return formattedResult;
};

const sendMessage = async (
  req: sendMessagePayload,
  res: protectedRouteLocals
) => {
  const { receiver, action, text } = req.body;
  const { refreshToken, authToken } = res.locals;
  const { userId, username } = res.locals.userData;

  console.log(receiver, action, text);

  const result = await Message.sendMessage({
    receiver,
    text,
    senderName: username,
    action,
    sender: userId
  });
  const formattedResult = handleSendMessageResponse(result);
  if (formattedResult.success) {
    return res.json({ refreshToken, authToken, ...formattedResult });
  }
  return res.status(400).json({ ...formattedResult });
};

export default sendMessage;
