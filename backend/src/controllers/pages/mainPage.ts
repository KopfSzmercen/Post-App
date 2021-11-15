import express from "express";
import { protectedRouteLocals } from "../../auth/authMiddleware";
import User from "../../models/user";

const getMainPage = async (req: express.Request, res: protectedRouteLocals) => {
  const { authToken, refreshToken, userData } = res.locals;
  const result = await User.getAllPosts(userData.userId);

  if (result.success) {
    return res.json({ ...result, authToken, refreshToken });
  }
  return res.status(400).json({ ...result, authToken, refreshToken });
};

export default getMainPage;
