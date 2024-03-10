import { EventEmitter } from "events";
import { assert } from "chai";
import { rusticramblersService } from "./rusticramblers-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, mozart, testTrektypes } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Trektype API tests", () => {
  let user = null;

  setup(async () => {
    await rusticramblersService.deleteAllTrektypes();
    await rusticramblersService.deleteAllUsers();
    user = await rusticramblersService.createUser(maggie);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create trektype", async () => {
    const returnedTrektype = await rusticramblersService.createTrektype(mozart);
    assert.isNotNull(returnedTrektype);
    assertSubset(mozart, returnedTrektype);
  });

  test("delete a trektype", async () => {
    const trektype = await rusticramblersService.createTrektype(mozart);
    const response = await rusticramblersService.deleteTrektype(trektype._id);
    assert.equal(response.status, 204);
    try {
      const returnedTrektype = await rusticramblersService.getTrektype(trektype.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Trektype with this id", "Incorrect Response Message");
    }
  });

  test("create multiple trektypes", async () => {
    for (let i = 0; i < testTrektypes.length; i += 1) {
      testTrektypes[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await rusticramblersService.createTrektype(testTrektypes[i]);
    }
    let returnedLists = await rusticramblersService.getAllTrektypes();
    assert.equal(returnedLists.length, testTrektypes.length);
    await rusticramblersService.deleteAllTrektypes();
    returnedLists = await rusticramblersService.getAllTrektypes();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant trektype", async () => {
    try {
      const response = await rusticramblersService.deleteTrektype("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Trektype with this id", "Incorrect Response Message");
    }
  });
});