import User from "./index";

export const getUserPosts = async (userId: string) => {
  try {
    const posts: any[] = [];

    const user = await User.findOne({ _id: userId }).populate({
      path: "postsCreated"
    });
    if (user) {
      user.postsCreated.forEach((post) => posts.push(post));
    }

    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllPosts = async (userId: string) => {
  try {
    const posts: any[] = [];

    const currentUser = await User.findOne({ _id: userId }).populate({
      path: "postsCreated"
    });
    if (currentUser) {
      currentUser.postsCreated.forEach((post) => posts.push(post));

      await Promise.all(
        currentUser.friends.map(async (friend) => {
          const friendPosts: any = await getUserPosts(friend);
          posts.push(...friendPosts);
        })
      );
      return { success: true, posts };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
