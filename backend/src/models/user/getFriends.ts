import User from ".";

interface friendData {
  id: string;
  username: string;
  email: string;
}

const getFriends = async (userId: string) => {
  const getFriendsResponse: {
    success: boolean;
    friends?: friendData[];
    error?: any;
  } = { success: true };
  try {
    const user = await User.findOne({ _id: userId }).populate("friends");
    if (!user) throw { error: `User ${userId} not found` };

    const friends: friendData[] = [];
    user.friends.forEach((friend: any) => {
      friends.push({
        id: friend._id,
        username: friend.username,
        email: friend.email
      });
    });

    getFriendsResponse.friends = friends;
    return getFriendsResponse;
  } catch (error) {
    getFriendsResponse.success = false;
    getFriendsResponse.error = error;
    return getFriendsResponse;
  }
};

export default getFriends;
