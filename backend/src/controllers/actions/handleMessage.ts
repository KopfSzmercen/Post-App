import express from "express";
import { protectedRoutePayload } from "../../auth/authMiddleware";
import { protectedRouteLocals } from "../../auth/authMiddleware";
import Message from "../../models/message/index";

interface requestPayload extends protectedRoutePayload {
  query: {
    messageId: string;
    action: "accept" | "decline" | "delete";
  };
}

const handleMessage = async (
  req: requestPayload,
  res: protectedRouteLocals
) => {
  const { refreshToken, authToken } = res.locals;
  const { userId } = res.locals.userData;
  const messageAction = req.query.action;
  const messageId = req.query.messageId;

  const result = await Message.handleMessageAction(
    messageId,
    messageAction,
    userId
  );

  if (result.success) {
    return res.json({ ...result });
  }

  return res.status(400).json({ ...result });
};

export default handleMessage;
