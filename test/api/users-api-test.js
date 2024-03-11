import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rusticramblersService } from "./rusticramblers-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    rusticramblersService.clearAuth();
    await rusticramblersService.createUser(maggie);
    await rusticramblersService.authenticate(maggieCredentials);
    await rusticramblersService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await rusticramblersService.createUser(testUsers[i]);
    }
    await rusticramblersService.createUser(maggie);
    await rusticramblersService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await rusticramblersService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await rusticramblersService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await rusticramblersService.deleteAllUsers();
    await rusticramblersService.createUser(maggie);
    await rusticramblersService.authenticate(maggieCredentials);
    returnedUsers = await rusticramblersService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await rusticramblersService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await rusticramblersService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await rusticramblersService.deleteAllUsers();
    await rusticramblersService.createUser(maggie);
    await rusticramblersService.authenticate(maggieCredentials);
    try {
      const returnedUser = await rusticramblersService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});