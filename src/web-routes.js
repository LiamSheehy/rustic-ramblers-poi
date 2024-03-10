import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { trektypeController } from "./controllers/trektype-controller.js";
import { placementController } from "./controllers/placement-controller.js";

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
  { method: "POST", path: "/trektype/{id}/addplacement", config: trektypeController.addPlacement },
  { method: "GET", path: "/trektype/{id}/deleteplacement/{placementid}", config: trektypeController.deletePlacement },

  { method: "GET", path: "/placement/{id}/editplacement/{placementid}", config: placementController.index },
  { method: "POST", path: "/placement/{id}/updateplacement/{placementid}", config: placementController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];