import { v4 } from "uuid";
import { placemarkMemStore } from "./placemark-mem-store.js";

let trektypes = [];

export const trektypeMemStore = {
  async getAllTrektypes() {
    return trektypes;
  },

  async addTrektype(trektype) {
    trektype._id = v4();
    trektypes.push(trektype);
    return trektype;
  },

  async getTrektypeById(id) {
    const list = trektypes.find((trektype) => trektype._id === id);
    if (list) {
      list.placemarks = await placemarkMemStore.getPlacemarksByTrektypeId(list._id);
      return list;
    }
    return null;
  },

  async getUserTrektypes(userid) {
    return trektypes.filter((trektype) => trektype.userid === userid);
  },

  async deleteTrektypeById(id) {
    const index = trektypes.findIndex((trektype) => trektype._id === id);
    if (index !== -1) trektypes.splice(index, 1);
  },

  async deleteAllTrektypes() {
    trektypes = [];
  },
};