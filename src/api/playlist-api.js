import Boom from "@hapi/boom";
import { IdSpec, TrektypeArraySpec, TrektypeSpec, TrektypeSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const trektypeApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const trektypes = await db.trektypeStore.getAllTrektypes();
        return trektypes;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: TrektypeArraySpec, failAction: validationError },
    description: "Get all trektypes",
    notes: "Returns all trektypes",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const trektype = await db.trektypeStore.getTrektypeById(request.params.id);
        if (!trektype) {
          return Boom.notFound("No Trektype with this id");
        }
        return trektype;
      } catch (err) {
        return Boom.serverUnavailable("No Trektype with this id");
      }
    },
    tags: ["api"],
    description: "Find a Trektype",
    notes: "Returns a trektype",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TrektypeSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const trektype = request.payload;
        const newTrektype = await db.trektypeStore.addTrektype(trektype);
        if (newTrektype) {
          return h.response(newTrektype).code(201);
        }
        return Boom.badImplementation("error creating trektype");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Trektype",
    notes: "Returns the newly created trektype",
    validate: { payload: TrektypeSpec, failAction: validationError },
    response: { schema: TrektypeSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const trektype = await db.trektypeStore.getTrektypeById(request.params.id);
        if (!trektype) {
          return Boom.notFound("No Trektype with this id");
        }
        await db.trektypeStore.deleteTrektypeById(trektype._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Trektype with this id");
      }
    },
    tags: ["api"],
    description: "Delete a trektype",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.trektypeStore.deleteAllTrektypes();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all TrektypeApi",
  },
};