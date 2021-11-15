import User from "./index";
import mongoose from "mongoose";

const addFriend = async (
  firstUser: string,
  secondUser: string
): Promise<{ success: boolean; errors?: { error: string } }> => {
  try {
    const userOne = await User.findOne({ _id: firstUser });
    if (!userOne) throw { error: `User ${firstUser} not found` };

    const userTwo = await User.findOne({ _id: secondUser });
    if (!userTwo) throw { error: `User ${secondUser} not found` };

    userOne.friends.forEach((friendId: string) => {
      if (friendId.toString() === userTwo._id.toString()) {
        throw { errors: { error: "These users are already friends" } };
      }
    });
    userTwo.friends.forEach((friendId: string) => {
      console.log(friendId, userOne._id.toString());
      if (friendId.toString() === userOne._id.toString()) {
        throw { errors: { error: "These users are already friends" } };
      }
    });

    await userOne.updateOne({ $push: { friends: userTwo._id } });
    await userTwo.updateOne({ $push: { friends: userOne._id } });

    return { success: true };
  } catch (error) {
    const err = error as { [key: string]: any };
    return { success: false, ...err };
  }
};

export default addFriend;
