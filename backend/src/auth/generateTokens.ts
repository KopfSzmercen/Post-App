require("dotenv").config();
import jwt from "jsonwebtoken";
import Token from "../models/token/index";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAuthToken = (payload: any) => {
  const authToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "20m"
  });
  return authToken;
};

export const generateRefreshToken = async (payload: any) => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);
  await Token.create({ value: refreshToken });
  return refreshToken;
};
