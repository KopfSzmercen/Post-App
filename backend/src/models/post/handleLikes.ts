import Post from "./index";
import User from "../user/index";

interface addLikeResult {
  success: boolean;
  newLikesNumber?: number;
  errors?: {
    [key: string]: string;
  };
}

const handleLikes = async (
  postId: string,
  userId: string,
  action: string
): Promise<addLikeResult> => {
  const result: addLikeResult = { success: true };
  try {
    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id: postId });

    if (!user) throw { user: "User requesting not found" };
    if (!post) throw { post: "Post with this id doesn't exist" };

    let newLikesNumber = post.likes.length;

    if (action === "LIKE") {
      await user.updateOne({ $push: { likedPosts: postId } });
      await post.updateOne({ $push: { likes: userId } });
      newLikesNumber++;
    } else if (action === "DISLIKE") {
      await user.updateOne({ $pull: { likedPosts: postId } });
      await post.updateOne({ $pull: { likes: userId } });
      newLikesNumber--;
    } else throw { action: "Invalid action" };

    return { ...result, newLikesNumber };
  } catch (error) {
    const err = error as { [key: string]: any };
    result.success = false;
    result.errors = { ...err };
    return result;
  }
};

export default handleLikes;
