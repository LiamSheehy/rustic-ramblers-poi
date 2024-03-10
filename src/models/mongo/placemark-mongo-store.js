import { Placemark } from "./placemark.js";
import { Trektype } from "./trektype.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(trektypeId, placemark) {
    placemark.trektypeid = trektypeId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarksByTrektypeId(id) {
    const placemarks = await Placemark.find({ trektypeid: id }).lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
    placemarkDoc.title = updatedPlacemark.title;
    placemarkDoc.details = updatedPlacemark.details;
    placemarkDoc.location = updatedPlacemark.location;
    await placemarkDoc.save();
  },
};