import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrektypes, mozart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trektype Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.trektypeStore.deleteAllTrektypes();
    for (let i = 0; i < testTrektypes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTrektypes[i] = await db.trektypeStore.addTrektype(testTrektypes[i]);
    }
  });

  test("create a trektype", async () => {
    const trektype = await db.trektypeStore.addTrektype(mozart);
    assertSubset(mozart, trektype);
    assert.isDefined(trektype._id);
  });

  test("delete all trektypes", async () => {
    let returnedTrektypes = await db.trektypeStore.getAllTrektypes();
    assert.equal(returnedTrektypes.length, 3);
    await db.trektypeStore.deleteAllTrektypes();
    returnedTrektypes = await db.trektypeStore.getAllTrektypes();
    assert.equal(returnedTrektypes.length, 0);
  });

  test("get a trektype - success", async () => {
    const trektype = await db.trektypeStore.addTrektype(mozart);
    const returnedTrektype = await db.trektypeStore.getTrektypeById(trektype._id);
    assertSubset(mozart, trektype);
  });

  test("delete One Playist - success", async () => {
    const id = testTrektypes[0]._id;
    await db.trektypeStore.deleteTrektypeById(id);
    const returnedTrektypes = await db.trektypeStore.getAllTrektypes();
    assert.equal(returnedTrektypes.length, testTrektypes.length - 1);
    const deletedTrektype = await db.trektypeStore.getTrektypeById(id);
    assert.isNull(deletedTrektype);
  });

  test("get a trektype - bad params", async () => {
    assert.isNull(await db.trektypeStore.getTrektypeById(""));
    assert.isNull(await db.trektypeStore.getTrektypeById());
  });

  test("delete One Trektype - fail", async () => {
    await db.trektypeStore.deleteTrektypeById("bad-id");
    const allTrektypes = await db.trektypeStore.getAllTrektypes();
    assert.equal(testTrektypes.length, allTrektypes.length);
  });
});