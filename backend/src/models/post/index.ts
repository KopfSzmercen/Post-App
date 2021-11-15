import User from "../user";
import { Schema, Model, model, Types } from "mongoose";
import { addPostPayload } from "../../controllers/actions/addPost";
import handleLikes from "./handleLikes";
import getSinglePost from "./getSinglePost";

interface Post {
  title: string;
  description: string;
  createdBy: string;
  likes: string[];
  creatorName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface addPostResult {
  success: boolean;
  error?: {
    errors: {
      title?: { message: string };
      description?: { message: string };
      exeption?: { message: string };
    };
  };
}

interface PostModel extends Model<Post> {
  addPost: (postData: addPostPayload) => Promise<addPostResult>;
  handleLikes: typeof handleLikes;
  getOnePost: typeof getSinglePost;
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title has to be at least 5 characters long"],
      maxlength: [30, "Title has to be max 30 characters long"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [5, "Description has to be at least 5 characters long"],
      maxlength: [500, "Description has to be max 500 characters long"]
    },
    createdBy: {
      required: [true, "Creator name is required"],
      type: Types.ObjectId,
      ref: "user"
    },
    creatorName: { type: String },
    likes: [{ type: Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

postSchema.statics.addPost = async function (postData: addPostPayload) {
  const { title, description, createdBy, creatorName } = postData;
  try {
    const result = await this.create({
      title,
      description,
      createdBy,
      creatorName,
      likes: []
    });

    await User.updateOne(
      { _id: createdBy },
      { $push: { postsCreated: result._id } }
    );

    return { success: true, ...result };
  } catch (error) {
    return { success: false, error };
  }
};

postSchema.statics.handleLikes = async function (
  postId: string,
  userId: string,
  action: string
) {
  const result = await handleLikes(postId, userId, action);
  return result;
};

postSchema.statics.getOnePost = async function (postId: string) {
  const result = await getSinglePost(postId);
  return result;
};

const Post = model<Post, PostModel>("Post", postSchema);
export default Post;
