require("dotenv").config();
import express from "express";

import Token from "../models/token/index";
import jwt from "jsonwebtoken";
import { generateAuthToken } from "./generateTokens";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const refreshToken = async (req: express.Request, res: express.Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(403);

  const storedToken = await Token.findOne({ value: refreshToken });
  if (!storedToken) return res.sendStatus(403);

  let newToken: string = "";
  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    (error: any, userData: any) => {
      if (error) return { success: false };
      if (!userData) return { success: false };
      if (!userData.userId || !userData.username) return { success: false };
      const authToken = generateAuthToken({
        userId: userData!.userId,
        username: userData!.username
      });
      newToken = authToken;
    }
  );
  return res.json({ success: true, authToken: newToken, refreshToken });
};

export default refreshToken;
