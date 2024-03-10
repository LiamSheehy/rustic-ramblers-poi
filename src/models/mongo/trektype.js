import Mongoose from "mongoose";

const { Schema } = Mongoose;

const playlistSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Trektype = Mongoose.model("Trektype", playlistSchema);