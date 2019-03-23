export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function isIntegrationTest() {
  return process.env.NODE_ENV === undefined;
}
