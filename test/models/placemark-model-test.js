import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrektypes, testPlacemarks, trek, place, mangerton, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  let trekList = null;

  setup(async () => {
    db.init("mongo");
    await db.trektypeStore.deleteAllTrektypes();
    await db.placemarkStore.deleteAllPlacemarks();
    trekList = await db.trektypeStore.addTrektype(trek);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(trekList._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const placeList = await db.trektypeStore.addTrektype(place);
    const placemark = await db.placemarkStore.addPlacemark(placeList._id, mangerton)
    assert.isNotNull(placemark._id);
    assertSubset (mangerton, placemark);
  });

  test("create multiple placemarkApi", async () => {
    const placemarks = await db.trektypeStore.getTrektypeById(trekList._id);
    assert.equal(testPlacemarks.length, testPlacemarks.length)
  });

  test("delete all placemarkApi", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const placeList = await db.trektypeStore.addTrektype(place);
    const placemark = await db.placemarkStore.addPlacemark(placeList._id, mangerton)
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset (mangerton, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarkStore.deletePlacemark(id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testTrektypes.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(id);
    assert.isNull(deletedPlacemark);
  });

  test("get a trektype - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete One User - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testTrektypes.length);
  });
});