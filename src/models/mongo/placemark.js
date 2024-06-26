import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  title: String,
  details: String,
  location: String,
  trektypeid: {
    type: Schema.Types.ObjectId,
    ref: "Trektype",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);