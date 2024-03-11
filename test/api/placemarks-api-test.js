import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rusticramblersService } from "./rusticramblers-service.js";
import { maggie, place, maggieCredentials, mangerton, testPlacemarks, testTrektypes } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let mountains = null;

  setup(async () => {
    rusticramblersService.clearAuth();
    user = await rusticramblersService.createUser(maggie);
    await rusticramblersService.authenticate(maggieCredentials);
    await rusticramblersService.deleteAllTrektypes();
    await rusticramblersService.deleteAllPlacemarks();
    await rusticramblersService.deleteAllUsers();
    user = await rusticramblersService.createUser(maggie);
    await rusticramblersService.authenticate(maggieCredentials);
    place.userid = user._id;
    mountains = await rusticramblersService.createTrektype(place);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await rusticramblersService.createPlacemark(mountains._id, mangerton);
    assertSubset(mangerton, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rusticramblersService.createPlacemark(mountains._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await rusticramblersService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await rusticramblersService.getPlacemark(returnedPlacemarks[i]._id);
      assertSubset(placemark, returnedPlacemarks[i]);
    }
  });

  test("Delete PlacemarkApi", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rusticramblersService.createPlacemark(mountains._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await rusticramblersService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await rusticramblersService.deletePlacemark(returnedPlacemarks[i]._id);
    }
    returnedPlacemarks = await rusticramblersService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("denormalised trektype", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rusticramblersService.createPlacemark(mountains._id, testPlacemarks[i]);
    }
    const returnedTrektype = await rusticramblersService.getTrektype(mountains._id);
    assert.equal(returnedTrektype.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedTrektype.placemarks[i]);
    }
  });
});