import { protectedRouteLocals } from "../../auth/authMiddleware";
import User from "../../models/user";
import express from "express";

const getFirendsList = async (
  req: express.Request,
  res: protectedRouteLocals
) => {
  const { authToken, refreshToken, userData } = res.locals;

  const result = await User.getFriends(userData.userId);
  if (result.success) {
    return res.json({ ...result, authToken, refreshToken });
  }
  return res.status(400).json({ ...result, authToken, refreshToken });
};

export default getFirendsList;
