import express from "express";
import Token from "../models/token";

const logout = async (req: express.Request, res: express.Response) => {
  const { refreshToken } = req.body;
  try {
    await Token.findOneAndDelete({ value: refreshToken });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export default logout;
