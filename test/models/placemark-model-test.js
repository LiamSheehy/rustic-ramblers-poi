import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrektypes, testPlacemarks, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    await db.init("mongo");
    await db.trektypeStore.deleteAllTrektypes();
    await db.placemarkStore.deleteAllPlacemarks();
    beethovenList = await db.trektypeStore.addTrektype(beethoven);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(beethovenList._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const mozartList = await db.trektypeStore.addTrektype(mozart);
    const placemark = await db.placemarkStore.addPlacemark(mozartList._id, concerto)
    assert.isNotNull(placemark._id);
    assertSubset (concerto, placemark);
  });

  test("create multiple placemarkApi", async () => {
    const placemarks = await db.trektypeStore.getTrektypeById(beethovenList._id);
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
    const mozartList = await db.trektypeStore.addTrektype(mozart);
    const placemark = await db.placemarkStore.addPlacemark(mozartList._id, concerto)
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset (concerto, newPlacemark);
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