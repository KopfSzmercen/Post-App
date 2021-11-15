import express from "express";
import User from "../../models/user/index";
import handleErrors from "./handleErrors";

export interface registerPayload {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface registerRequest extends express.Request {
  body: registerPayload;
}

export const postRegister = async (
  req: registerRequest,
  res: express.Response
) => {
  const result = await User.register(req.body);
  const formattedResult = handleErrors(result);

  if (!formattedResult.success) return res.status(400).json(formattedResult);
  return res.status(200).json(formattedResult);
};

export interface loginPayload {
  email: string;
  password: string;
}

interface loginRequest extends express.Request {
  body: loginPayload;
}

export const postLogin = async (req: loginRequest, res: express.Response) => {
  const result = await User.login(req.body);

  const formattedErrors = handleErrors(result);
  if (result.success) {
    return res.json({
      ...formattedErrors,
      authToken: result.authToken,
      refreshToken: result.refreshToken,
      username: result.currentUserName,
      userId: result.userId,
      messagesNumber: result.messagesNumber
    });
  }
  return res.status(403).json(formattedErrors);
};
