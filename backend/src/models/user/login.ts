import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./index";
import { loginPayload } from "../../controllers/login-register";
import {
  generateAuthToken,
  generateRefreshToken
} from "../../auth/generateTokens";
import validator from "validator";
import Message from "../message";

export interface loginErrors {
  email?: { message: string };
  password?: { message: string };
}

export interface loginResult {
  success: boolean;
  errors?: {
    email?: { message: string };
    password?: { message: string };
  };
  authToken?: string;
  refreshToken?: string;
  currentUserName?: string;
  userId?: string;
  messagesNumber: number;
}

const login = async (data: loginPayload) => {
  const { email, password } = data;
  try {
    if (!email) {
      throw { email: { message: "Please enter an email" } };
    }
    if (!validator.isEmail(email))
      throw { email: { message: "Please enter a valid email" } };

    if (!password) throw { password: { message: "Please enter a password" } };
    if (!validator.isLength(password, { min: 5, max: 15 }))
      throw {
        email: {
          message: "Password has to be between 5 and 15 characters long"
        }
      };

    const user = await User.findOne({ email }).populate("messages");

    if (!user) {
      throw { email: { message: "No user with this email" } };
    }

    const passwordsDoMatch = await bcrypt.compare(password, user.password);
    if (!passwordsDoMatch) throw { password: { message: "Invalid password" } };

    const tokenPayload = { userId: user._id, username: user.username };
    const authToken = generateAuthToken(tokenPayload);
    const refreshToken = await generateRefreshToken(tokenPayload);

    let messagesNumber = 0;
    user.messages.forEach((message: any) => {
      if (message.receiver[0].toString() == user._id.toString())
        messagesNumber++;
    });

    return {
      success: true,
      refreshToken,
      authToken,
      currentUserName: user.username,
      userId: user._id,
      messagesNumber
    };
  } catch (error) {
    const errors = error as loginErrors;
    return { success: false, errors: errors };
  }
};

export default login;
