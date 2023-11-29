import {
  grantTokenXOboToken,
  isInvalidTokenSet,
  validateIdportenToken,
} from "@navikt/next-auth-wonderwall";
import { IncomingMessage } from "http";

export type TokenXResult = TokenXError | string;

export type TokenXError = {
  errorType:
    | "NO_AUTH_HEADER_FOUND"
    | "IDPORTEN_TOKEN_INVALID"
    | "TOKENX_FAILED";
  message: string;
  error?: Error | unknown;
};

export function isInvalidToken(
  tokenXResult: TokenXResult,
): tokenXResult is TokenXError {
  return typeof tokenXResult !== "string";
}

/**
 * Exchanges subject token found in the authorization header with a access token for a given audience.
 * If the subject token is not found, or the token exchange failed, `null` will be returned.
 */
export async function exchangeIdportenSubjectToken(
  request: IncomingMessage,
  audience: string,
): Promise<TokenXResult> {
  const authHeader = request.headers["authorization"];

  if (!authHeader) {
    console.log("No token found in authorization header.");
    return {
      errorType: "NO_AUTH_HEADER_FOUND",
      message: "No token found in authorization header.",
    };
  }

  const validationResult = await validateIdportenToken(authHeader);
  if (validationResult !== "valid") {
    console.log(
      `Failed to validate due to: ${validationResult.errorType} ${validationResult.message}`,
    );
    return {
      errorType: "IDPORTEN_TOKEN_INVALID",
      message: validationResult.message,
      error: validationResult.error,
    };
  }

  const validSubjectToken = authHeader.replace("Bearer ", "");

  const grantResult = await grantTokenXOboToken(validSubjectToken, audience);
  if (isInvalidTokenSet(grantResult)) {
    console.error(
      `TokenX failed: ${grantResult.errorType} ${grantResult.message}`,
    );
    return {
      errorType: "TOKENX_FAILED",
      message: grantResult.message,
      error: grantResult.error,
    };
  }

  return grantResult;
}
