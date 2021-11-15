import express from "express";
import { protectedRouteLocals } from "../../auth/authMiddleware";
import Post from "../../models/post";

interface postActionRequest extends express.Request {
  query: {
    postId: string;
    action: string;
  };
}

export const postAction = async (
  req: postActionRequest,
  res: protectedRouteLocals
) => {
  const { refreshToken, authToken } = res.locals;
  const { userId } = res.locals.userData;
  const postId = req.query.postId;
  const action = req.query.action;

  const result = await Post.handleLikes(postId, userId, action);
  if (result.success) return res.json(result);
  return res.status(400).json({ ...result });
};
