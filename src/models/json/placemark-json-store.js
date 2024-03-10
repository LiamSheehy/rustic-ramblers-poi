import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(trektypeId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.trektypeid = trektypeId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByTrektypeId(id) {
    await db.read();
    let t = db.data.placemarks.filter((placemark) => placemark.trektypeid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getPlacemarkById(id) {
    await db.read();
    let t = db.data.placemarks.find((placemark) => placemark._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deletePlacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.details = updatedPlacemark.details;
    placemark.location = updatedPlacemark.location;
    await db.write();
  },
};