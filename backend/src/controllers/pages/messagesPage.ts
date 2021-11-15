import { protectedRouteLocals } from "../../auth/authMiddleware";
import User from "../../models/user";
import express from "express";

const getUserMessages = async (
  req: express.Request,
  res: protectedRouteLocals
) => {
  const { userData } = res.locals;
  const result = await User.getMessages(userData.userId);
  if (result.success) {
    return res.json(result);
  }
  return res.status(400).json(result);
};

export default getUserMessages;
