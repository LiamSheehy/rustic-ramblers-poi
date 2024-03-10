import { userApi } from "./api/user-api.js";
import { trektypeApi } from "./api/trektype-api.js";
import { placemarkApi } from "./api/placemark-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/trektypes", config: trektypeApi.create },
  { method: "DELETE", path: "/api/trektypes", config: trektypeApi.deleteAll },
  { method: "GET", path: "/api/trektypes", config: trektypeApi.find },
  { method: "GET", path: "/api/trektypes/{id}", config: trektypeApi.findOne },
  { method: "DELETE", path: "/api/trektypes/{id}", config: trektypeApi.deleteOne },

  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "POST", path: "/api/trektypes/{id}/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
];