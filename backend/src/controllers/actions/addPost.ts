import Post from "../../models/post";
import { protectedRouteLocals } from "../../auth/authMiddleware";
import { protectedRoutePayload } from "../../auth/authMiddleware";

import handlePostError from "./handlePostError";

interface addPostRequest extends protectedRoutePayload {
  body: {
    title: string;
    description: string;
    authToken?: string;
    refreshToken: string;
  };
}

export interface addPostPayload {
  title: string;
  description: string;
  createdBy: string;
  creatorName: string;
}

const addPost = async (req: addPostRequest, res: protectedRouteLocals) => {
  const { refreshToken, authToken } = res.locals;
  const { userId, username } = res.locals.userData;
  const { title, description } = req.body;

  const result = await Post.addPost({
    title,
    description,
    createdBy: userId,
    creatorName: username
  });
  const formattedResult = handlePostError(result);
  return res.json({ ...formattedResult });
};

export default addPost;
