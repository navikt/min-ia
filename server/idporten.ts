import fetch from "node-fetch";
import {
  createRemoteJWKSet,
  FlattenedJWSInput,
  JWSHeaderParameters,
  jwtVerify,
  KeyLike,
} from "jose";
import { Issuer } from "openid-client";
import { GetKeyFunction } from "jose/dist/types/types";

const acceptedAcrLevel = "Level4";
const acceptedSigningAlgorithm = "RS256";

let idportenIssuer: Issuer;
let _remoteJWKSet:
  | KeyLike
  | Uint8Array
  | GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

//const IDPORTEN_WELL_KNOWN_URL="https://fakedings.dev-gcp.nais.io/fake/.well-known/openid-configuration"

export async function initIdporten() {
  if (process.env.NODE_ENV === "development") {
    // I labs så returnerer vi mock uansett
    return;
  }
  idportenIssuer = await Issuer.discover(process.env.IDPORTEN_WELL_KNOWN_URL!);
  _remoteJWKSet = createRemoteJWKSet(
    new URL(idportenIssuer.metadata.jwks_uri!)
  );
}

export async function verifiserAccessToken(token: any) {
  // @ts-ignore
  const { payload } = await jwtVerify(token, _remoteJWKSet, {
    algorithms: [acceptedSigningAlgorithm],
    issuer: idportenIssuer.metadata.issuer,
  });

  if (payload.client_id !== process.env.IDPORTEN_CLIENT_ID) {
    throw new Error("Invalid client ID in token");
  }

  if (payload.acr !== acceptedAcrLevel) {
    throw new Error("Invalid ACR-level");
  }
}
export async function getMockTokenFromIdporten() {
  return await (
    await fetch(process.env.FAKEDINGS_URL_IDPORTEN + "?acr=Level=4")
  ).text();
}
