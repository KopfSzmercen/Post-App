import { protectedRouteLocals } from "../../auth/authMiddleware";
import express from "express";
import Post from "../../models/post/index";

const getSinglePost = async (
  req: express.Request,
  res: protectedRouteLocals
) => {
  const { postId } = req.params;
  const result = await Post.getOnePost(postId);
  if (!result.success) return res.status(400).json(result);
  return res.json(result);
};

export default getSinglePost;
