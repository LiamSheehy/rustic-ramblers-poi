import { userMemStore } from "./mem/user-mem-store.js";
import { trektypeMemStore } from "./mem/trektype-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { trektypeJsonStore } from "./json/trektype-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { trektypeMongoStore } from "./mongo/trektype-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  trektypeStore: null,
  placemarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.trektypeStore = trektypeJsonStore;
        this.placemarkStore = placemarkJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.trektypeStore = trektypeMongoStore;
        this.placemarkStore = placemarkMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.trektypeStore = trektypeMemStore;
        this.placemarkStore = placemarkMemStore;
    }
  }
};