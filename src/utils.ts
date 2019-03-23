export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function isIntegrationTest() {
  return process.env.NODE_ENV === undefined;
}

export function getJwtSecret() {
  if (isIntegrationTest()) {
    return "TEST_SECRET";
  }
  return process.env.JWT_SECRET;
}
