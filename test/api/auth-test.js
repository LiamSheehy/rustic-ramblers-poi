import { assert } from "chai";
import { rusticramblersService } from "./rusticramblers-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    rusticramblersService.clearAuth();
    await rusticramblersService.createUser(maggie);
    await rusticramblersService.authenticate(maggieCredentials);
    await rusticramblersService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await rusticramblersService.createUser(maggie);
    const response = await rusticramblersService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await rusticramblersService.createUser(maggie);
    const response = await rusticramblersService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    rusticramblersService.clearAuth();
    try {
      await rusticramblersService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});