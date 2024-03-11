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
        details: request.payload.details,
        location: request.payload.location,
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

  uploadImage: {
    handler: async function (request, h) {
      try {
        const trektype = await db.trektypeStore.getTrektypeById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          trektype.img = url;
          await db.trektypeStore.updateTrektype(trektype);
        }
        return h.redirect(`/trektype/${trektype._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/trektype/${trektype._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};