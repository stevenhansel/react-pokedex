import humps from "lodash-humps-ts";

export const camelcaseObject = (object: object) => humps(object);
