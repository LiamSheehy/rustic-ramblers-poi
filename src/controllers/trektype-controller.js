import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const trektypeController = {
  index: {
    handler: async function (request, h) {
      const trektype = await db.trektypeStore.getTrektypeById(request.params.id);
      const viewData = {
        title: "Trektype",
        trektype: trektype,
      };
      return h.view("trektype-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("trektype-view", { title: "Add placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const trektype = await db.trektypeStore.getTrektypeById(request.params.id);
      const newPlacemark = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.placemarkStore.addPlacemark(trektype._id, newPlacemark);
      return h.redirect(`/trektype/${trektype._id}`);
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const trektype = await db.trektypeStore.getTrektypeById(request.params.id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/trektype/${trektype._id}`);
    },
  },
};