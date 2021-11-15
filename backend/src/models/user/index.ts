import mongoose, { Model, model, Schema } from "mongoose";
import validator from "validator";

import hasTheSameData from "./theSameData";
import { registerPayload } from "../../controllers/login-register/index";
import register from "./register";
import { registerResult } from "./register";

import { loginPayload } from "../../controllers/login-register/index";
import login from "./login";
import { loginResult } from "./login";
import { getAllPosts } from "./getPosts";
import addFriend from "./addFriend";

import Post from "../post/index";
import getFriends from "./getFriends";
import getUsers from "./getUsers";
import getMessages from "./getMessages";

interface User {
  username: string;
  email: string;
  password: string;
  friends: string[];
  likedPosts: string[];
  postsCreated: string[];
  messages: string[];
  _id: string;
}

interface UserModel extends Model<User> {
  register: (data: registerPayload) => Promise<registerResult>;
  login: (data: loginPayload) => Promise<loginResult>;
  getAllPosts: (userId: string) => Promise<Post | any>;
  addToFriends: typeof addFriend;
  getFriends: typeof getFriends;
  getOtherUsers: typeof getUsers;
  getMessages: typeof getMessages;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [5, "Username has to be at least 5 characters long"],
    maxlength: [15, "Username has to be max 15 characters long"],
    validate: {
      validator: async (value: string) => {
        const usernameIsUsed = await hasTheSameData("username", value);
        if (usernameIsUsed)
          throw new Error(
            "This username is already used. Please try another one"
          );
      }
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: async (value: string) => {
        if (!validator.isEmail(value))
          throw new Error("Please enter a valid email");

        const emailIsUsed = await hasTheSameData("email", value);
        if (emailIsUsed)
          throw new Error("This email is already used. Please try another one");
      }
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  likedPosts: [{ type: mongoose.Types.ObjectId, ref: Post }],
  postsCreated: [{ type: mongoose.Types.ObjectId, ref: Post }],
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }]
});

userSchema.statics.register = async function (data: registerPayload) {
  const result = await register(data);
  return result;
};

userSchema.statics.login = async function (data: loginPayload) {
  const result = await login(data);
  return result;
};

userSchema.statics.getAllPosts = async function (userId: string) {
  const result = await getAllPosts(userId);
  return result;
};

userSchema.statics.addToFriends = async function (
  userOneId: string,
  userTwoId: string
) {
  const result = await addFriend(userOneId, userTwoId);
  return result;
};

userSchema.statics.getFriends = async function (userId: string) {
  const result = await getFriends(userId);
  return result;
};

userSchema.statics.getOtherUsers = async function (userId: string) {
  const result = await getUsers(userId);
  return result;
};

userSchema.statics.getMessages = async function (userId: string) {
  const result = await getMessages(userId);
  return result;
};

const User = model<User, UserModel>("User", userSchema);

export default User;
