import validator from "validator";
import bcrypt from "bcrypt";
import { registerPayload } from "../../controllers/login-register";
import User from "../user/index";

export interface registerErrors {
  username?: { message: string };
  email?: { message: string };
  password?: { message: string };
  confirmPassword?: { message: string };
}

export interface registerResult extends registerErrors {
  success: boolean;
  errors?: registerErrors;
}

const register = async (data: registerPayload): Promise<registerResult> => {
  const { password, confirmPassword } = data;
  try {
    if (!password || !confirmPassword)
      throw {
        success: false,
        errors: { password: { message: "Passwords are required" } }
      };

    if (!validator.isLength(password, { min: 5, max: 15 })) {
      throw {
        success: false,
        errors: {
          password: {
            message: "Passwors have to be between 5 and 15 characters long"
          }
        }
      };
    }

    if (password !== confirmPassword)
      throw {
        success: false,
        errors: { password: { message: "Passwords do not match" } }
      };

    if (!validator.isLength(confirmPassword, { min: 5, max: 15 })) {
      throw {
        success: false,
        errors: {
          confirmPassword: {
            message: "Passwords have to be between 5 and 15 characters long"
          }
        }
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      ...data,
      password: hashedPassword,
      friends: [],
      likedPosts: [],
      postsCreated: [],
      messages: []
    });
    return { success: true };
  } catch (error) {
    const err = error as registerErrors;
    return { success: false, ...err };
  }
};

export default register;
