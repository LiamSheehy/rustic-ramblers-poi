import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const trektypeJsonStore = {
  async getAllTrektypes() {
    await db.read();
    return db.data.trektypes;
  },

  async addTrektype(trektype) {
    await db.read();
    trektype._id = v4();
    db.data.trektypes.push(trektype);
    await db.write();
    return trektype;
  },

  async getTrektypeById(id) {
    await db.read();
    let list = db.data.trektypes.find((trektype) => trektype._id === id);
    if (list) {
      list.placemarks = await placemarkJsonStore.getPlacemarksByTrektypeId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserTrektypes(userid) {
    await db.read();
    return db.data.trektypes.filter((trektype) => trektype.userid === userid);
  },

  async deleteTrektypeById(id) {
    await db.read();
    const index = db.data.trektypes.findIndex((trektype) => trektype._id === id);
    if (index !== -1) db.data.trektypes.splice(index, 1);
    await db.write();
  },

  async deleteAllTrektypes() {
    db.data.trektypes = [];
    await db.write();
  },
};