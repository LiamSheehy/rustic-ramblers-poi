import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const rusticramblersService = {
  rusticramblersUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.rusticramblersUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.rusticramblersUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.rusticramblersUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.rusticramblersUrl}/api/users`);
    return res.data;
  },

  async createTrektype(trektype) {
    const res = await axios.post(`${this.rusticramblersUrl}/api/trektypes`, trektype);
    return res.data;
  },

  async deleteAllTrektypes() {
    const response = await axios.delete(`${this.rusticramblersUrl}/api/trektypes`);
    return response.data;
  },

  async deleteTrektype(id) {
    const response = await axios.delete(`${this.rusticramblersUrl}/api/trektypes/${id}`);
    return response;
  },

  async getAllTrektypes() {
    const res = await axios.get(`${this.rusticramblersUrl}/api/trektypes`);
    return res.data;
  },

  async getTrektype(id) {
    const res = await axios.get(`${this.rusticramblersUrl}/api/trektypes/${id}`);
    return res.data;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.rusticramblersUrl}/api/placemarks`);
    return res.data;
  },

  async createPlacemark(id, placemark) {
    const res = await axios.post(`${this.rusticramblersUrl}/api/trektypes/${id}/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.rusticramblersUrl}/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.rusticramblersUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.rusticramblersUrl}/api/placemarks/${id}`);
    return res.data;
  },
};