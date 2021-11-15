import express from "express";
import { protectedRouteLocals } from "../../auth/authMiddleware";
import User from "../../models/user";

const getOtherUsers = async (
  req: express.Request,
  res: protectedRouteLocals
) => {
  const { authToken, refreshToken, userData } = res.locals;
  const result = await User.getOtherUsers(userData.userId);

  if (result.success) {
    return res.json({ ...result });
  }
  return res.status(400).json({ ...result, authToken, refreshToken });
};

export default getOtherUsers;
