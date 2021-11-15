import Post from ".";

interface result {
  success: boolean;
  error?: any;
  postData?: Post;
}

const getSinglePost = async (postId: string) => {
  const result: result = { success: true };
  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      result.success = false;
      result.error = "Post not found";
      return result;
    }
    result.postData = post;
    return result;
  } catch (error) {
    result.success = false;
    result.error = error;
    return result;
  }
};

export default getSinglePost;
