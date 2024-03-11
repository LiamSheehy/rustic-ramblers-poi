import { Trektype } from "./trektype.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const trektypeMongoStore = {
  async getAllTrektypes() {
    const trektypes = await Trektype.find().lean();
    return trektypes;
  },

  async getTrektypeById(id) {
    if (id) {
      const trektype = await Trektype.findOne({ _id: id }).lean();
      if (trektype) {
        trektype.placemarks = await placemarkMongoStore.getPlacemarksByTrektypeId(trektype._id);
      }
      return trektype;
    }
    return null;
  },

  async addTrektype(trektype) {
    const newTrektype = new Trektype(trektype);
    const trektypeObj = await newTrektype.save();
    return this.getTrektypeById(trektypeObj._id);
  },

  async getUserTrektypes(id) {
    const trektype = await Trektype.find({ userid: id }).lean();
    return trektype;
  },

  async deleteTrektypeById(id) {
    try {
      await Trektype.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTrektypes() {
    await Trektype.deleteMany({});
  },

  async updateTrektype(updatedTrektype) {
    const trektype = await Trektype.findOne({ _id: updatedTrektype._id });
    trektype.title = updatedTrektype.title;
    trektype.img = updatedTrektype.img;
    await trektype.save();
  },
};