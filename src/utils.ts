import { Exception } from "typemoq/_all";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isIntegrationTest(): boolean {
  return process.env.NODE_ENV === undefined;
}

export function getJwtSecret(): string {
  if (isIntegrationTest()) {
    return "TEST_SECRET";
  }
  return process.env.JWT_SECRET;
}

export function getParadiseURI(): string {
  if (isIntegrationTest()) {
    throw new Error("Should consider the external API down for integration tests");
  }
  return process.env.ARTICLES_API_BASE_URI;
}
