import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { trektypeController } from "./controllers/trektype-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import os from "os";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addtrektype", config: dashboardController.addTrektype },
  { method: "GET", path: "/dashboard/deletetrektype/{id}", config: dashboardController.deleteTrektype },

  { method: "GET", path: "/trektype/{id}", config: trektypeController.index },
  { method: "POST", path: "/trektype/{id}/addplacemark", config: trektypeController.addPlacemark },
  { method: "GET", path: "/trektype/{id}/deleteplacemark/{placemarkid}", config: trektypeController.deletePlacemark },

  { method: "GET", path: "/placemark/{id}/editplacemark/{placemarkid}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/updateplacemark/{placemarkid}", config: placemarkController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  {
  method: 'GET',
  path: '/testlb',
  handler: function (request, h) {
     return('Server: ' + os.hostname());
  },
  config: {auth: false}
},
];
