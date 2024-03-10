import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const trektype = await db.trektypeStore.getTrekTypeById(request.params.id);
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
      const viewData = {
        title: "Edit Trek",
        trektype: trektype,
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Edit placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
      const newPlacemark = {
        title: request.payload.title,
        details: request.payload.details,
        location: Number(request.payload.location),
      };
      await db.placemarkStore.updatePlacemark(placemark, newPlacemark);
      return h.redirect(`/trektype/${request.params.id}`);
    },
  },
};
