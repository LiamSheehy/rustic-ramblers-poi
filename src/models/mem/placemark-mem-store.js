import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(trektypeId, placemark) {
    placemark._id = v4();
    placemark.trektypeid = trektypeId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByTrektypeId(id) {
    return placemarks.filter((placemark) => placemark.trektypeid === id);
  },

  async getPlacemarkById(id) {
    let foundPlacemark = placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemark) {
      foundPlacemark = null;
    }
    return foundPlacemark;
  },

  async getTrektypePlacemarks(trektypeId) {
    let foundPlacemarks = placemarks.filter((placemark) => placemark.trektypeid === trektypeId);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.details = updatedPlacemark.details;
    placemark.location = updatedPlacemark.location;
  },
};