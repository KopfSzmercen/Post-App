import User from ".";
interface userData {
  username: string;
  email: string;
  id: string;
  isSentRequest: boolean;
}

interface getUsersResult {
  success: boolean;
  users?: userData[];
  error?: any;
}

const getUsers = async (userId: string) => {
  const result: getUsersResult = { success: true };
  try {
    const user = await User.findOne({ _id: userId }).populate("messages");
    if (!user) throw `User ${userId} not found`;
    const userFriends = user.friends.map((userId) => userId.toString());
    const users = await User.find();
    const usersArray: userData[] = [];

    users.forEach((singleUser) => {
      if (
        singleUser._id.toString() !== userId.toString() &&
        !userFriends.includes(singleUser._id.toString())
      ) {
        let isSentRequest = false;
        user.messages.forEach((message: any) => {
          if (
            message.action === "ADD_FRIEND" &&
            message.receiver[0].toString() == singleUser._id.toString()
          ) {
            isSentRequest = true;
          }
        });

        usersArray.push({
          username: singleUser.username,
          email: singleUser.email,
          id: singleUser._id,
          isSentRequest
        });
      }
    });
    result.users = usersArray;
    return result;
  } catch (error) {
    result.error = error;
    result.success = false;
    return result;
  }
};

export default getUsers;
