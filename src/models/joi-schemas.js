import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Piano Sonata No. 7"),
    details: Joi.string().required().example("Beethoven"),
    location: Joi.string().required().example("Kerry"),
    trektypeid: IdSpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const TrektypeSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beethoven Sonatas"),
    userid: IdSpec,
    placemarks: PlacemarkArraySpec,
  })
  .label("Trektype");

export const TrektypeSpecPlus = TrektypeSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrektypePlus");

export const TrektypeArraySpec = Joi.array().items(TrektypeSpecPlus).label("TrektypeArray");