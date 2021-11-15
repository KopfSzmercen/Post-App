import User from "../user";
import { Schema, Model, model, Types } from "mongoose";
import handleMessageAction from "./handleMessage";

interface Message {
  sender: string;
  senderName: string;
  receiver: string;
  action: string;
  text: string;
}

interface newMessageData {
  senderName: string;
  sender: string;
  receiver: string;
  action: string;
  text: string;
}

export interface sendMessageResult {
  success: boolean;
  error?: {
    errors: {
      sender?: { message: string };
      receiver?: { message: string };
      exeption?: { message: string };
      action?: { message: string };
    };
  };
}

interface MessageModel extends Model<Message> {
  sendMessage: (newMessageData: newMessageData) => Promise<sendMessageResult>;
  handleMessageAction: typeof handleMessageAction;
}

const messageSchema = new Schema(
  {
    sender: {
      required: [true, "Sender is required"],
      type: [Schema.Types.ObjectId, "Invalid type"],
      ref: "User"
    },
    receiver: {
      required: [true, "Receiver is required"],
      type: [Types.ObjectId, "Invalid receiver Id"],
      ref: "User",
      validate: {
        validator: async (value: any) => {
          if (!(new Types.ObjectId(value) instanceof Types.ObjectId)) {
            throw { exeption: { message: "Invalid receiver ID. " } };
          }
          const user = await User.findOne({ _id: value });
          if (!user) {
            throw { exeption: { message: "User with this ID doesn't exist" } };
          }
        }
      }
    },
    senderName: {
      type: String
    },
    action: {
      required: [true, "Action is required"],
      type: String,
      validate: {
        validator: (value: string) => {
          if (value !== "TEXT_MESSAGE" && value !== "ADD_FRIEND") {
            throw new Error("Invalid message action");
          }
        }
      }
    },
    text: {
      type: String
    }
  },
  { timestamps: true }
);

messageSchema.statics.sendMessage = async function (
  newMessageData: newMessageData
): Promise<sendMessageResult> {
  if (newMessageData.sender === newMessageData.receiver) {
    return {
      success: false,
      error: {
        errors: {
          exeption: { message: "Sender and Receiver IDs are the same" }
        }
      }
    };
  }
  if (newMessageData.text) {
    if (
      newMessageData.text.trim() === "" &&
      newMessageData.action === "ADD_FRIEND"
    ) {
      newMessageData.text = `${newMessageData.senderName} wants to become Your friend`;
    }
  } else {
    newMessageData.text = `${newMessageData.senderName} wants to become Your friend`;
  }

  try {
    const result = await this.create({
      ...newMessageData,
      sender: newMessageData.sender,
      receiver: newMessageData.receiver,
      senderName: newMessageData.senderName
    });

    await User.updateOne(
      { _id: newMessageData.sender },
      { $push: { messages: result._id } }
    );
    await User.updateOne(
      { _id: newMessageData.receiver },
      { $push: { messages: result._id } }
    );
    return result;
  } catch (error) {
    return {
      success: false,
      error: { errors: { exeption: { message: "Invalid receiver ID" } } }
    };
  }
};

messageSchema.statics.handleMessageAction = async function (
  messageId: string,
  action: string,
  performerId: string
) {
  const result = await handleMessageAction(messageId, action, performerId);
  return result;
};

const Message = model<Message, MessageModel>("Message", messageSchema);
export default Message;
