import Message from "./index";
import User from "../user/index";

const handleMessageAction = async (
  messageId: string,
  action: string,
  performerId: string
) => {
  try {
    const message = await Message.findOne({ _id: messageId });
    if (!message) {
      throw { error: { message: "No message with this id" } };
    }
    if (message.action === "ADD_FRIEND") {
      if (action === "accept") {
        const result = await User.addToFriends(
          message.sender,
          message.receiver
        );
        await Message.findOneAndDelete({ _id: messageId });
        if (!result.success) {
          throw result;
        }
      } else {
        await Message.findOneAndDelete({ _id: messageId });
      }
      await User.updateOne(
        { _id: performerId },
        { $pullAll: { messages: [messageId] } }
      );
    }

    if (action === "decline") {
      await User.updateOne(
        { _id: performerId },
        { $pullAll: { messages: [messageId] } }
      );
      await User.updateOne(
        { _id: message.receiver },
        { $pullAll: { messages: [messageId] } }
      );
      await Message.findOneAndDelete({ _id: messageId });
    }

    return { success: true };
  } catch (error) {
    const err = error as any;
    const errorMessage = err.message || err;
    return { success: false, ...errorMessage };
  }
};

export default handleMessageAction;
