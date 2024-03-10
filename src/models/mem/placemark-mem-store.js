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
    let placemark = placemarks.find((placemark) => placemark._id === id);
    if (placemark == undefined) {
      placemark = null;
    }
    return placemark;
  },

  async getTrektypePlacemarks(trektypeId) {
    return placemarks.filter((placemark) => placemark.trektypeid === trektypeId);
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
    placemark.artist = updatedPlacemark.artist;
    placemark.duration = updatedPlacemark.duration;
  },
};