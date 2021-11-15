import { Schema, Model, model } from "mongoose";

interface Token {
  value: string;
}
interface TokenModel extends Model<Token> {}

const tokenSchema = new Schema(
  {
    value: { type: String }
  },
  { timestamps: true }
);

const Token = model<Token>("Token", tokenSchema);
export default Token;
