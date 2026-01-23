import { requestOboToken, validateToken, getToken } from "@navikt/oasis";
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

  const token = getToken(request);

  if (token == null) {
    return {
      errorType: "NO_AUTH_HEADER_FOUND",
      message: "No token found in authorization header.",
    };
  }

  const validationResult = await validateToken(token);
  if (!validationResult.ok) {
    console.log(
      `Failed to validate due to: ${validationResult.errorType} ${validationResult.error.message}`,
    );
    return {
      errorType: "IDPORTEN_TOKEN_INVALID",
      message: validationResult.error.message,
      error: validationResult.error,
    };
  }

  const validSubjectToken = authHeader.replace("Bearer ", "");

  const grantResult = await requestOboToken(validSubjectToken, audience);
  if (!grantResult.ok) {
    console.error(
      `TokenX failed: cause:'${grantResult.error.cause}', message:'${grantResult.error.message}'`,
    );
    return {
      errorType: "TOKENX_FAILED",
      message: grantResult.error.message,
      error: grantResult.error,
    };
  }

  return grantResult.token;
}
