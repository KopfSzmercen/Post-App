import express from "express";
import jwt from "jsonwebtoken";

require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export interface protectedRoutePayload extends express.Request {
  body: {
    authToken?: string;
    refreshToken?: string;
  };
}

const verifyToken = (
  token: string
): { success: boolean; userData?: { userId: string; username: string } } => {
  let response: any = { success: true };
  jwt.verify(token, ACCESS_TOKEN_SECRET, (error, userData) => {
    if (error) {
      response.success = false;
    }
    response.userData = userData;
  });

  return response;
};

const authMiddleware = async (
  req: protectedRoutePayload,
  res: express.Response,
  next: express.NextFunction
) => {
  const authToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.body.refreshToken;

  if (!authToken) return res.sendStatus(403);

  const result = verifyToken(authToken!);

  if (result.success) {
    res.locals.refreshToken = refreshToken;
    res.locals.authToken = authToken;
    res.locals.userData = result.userData;
    return next();
  }

  return res.sendStatus(403);
};

export interface protectedRouteLocals extends express.Response {
  locals: {
    refreshToken: string;
    authToken: string;
    userData: {
      userId: string;
      username: string;
    };
  };
}

export default authMiddleware;
