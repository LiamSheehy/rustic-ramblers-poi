import { TrektypeSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const trektypes = await db.trektypeStore.getUserTrektypes(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        trektypes: trektypes,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addTrektype: {
    validate: {
      payload: TrektypeSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Trektype error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newTrektype = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.trektypeStore.addTrektype(newTrektype);
      return h.redirect("/dashboard");
    },
  },

  deleteTrektype: {
    handler: async function (request, h) {
      const trektype = await db.trektypeStore.getTrektypeById(request.params.id);
      await db.trektypeStore.deleteTrektypeById(trektype._id);
      return h.redirect("/dashboard");
    },
  },
};