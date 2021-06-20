export default async function param(uri, query) {
  let paramValues = uri.split("/:").filter((param) => param !== "");

  if (
    paramValues.length > 0 &&
    paramValues.length !== Object.keys(query).length
  ) {
    return false;
  }
  if (!paramValues.every((param) => query[param])) {
    return false;
  }

  return true;
}
