import fetch from "node-fetch";
import {createRemoteJWKSet, jwtVerify} from "jose";
import {Issuer} from "openid-client";

const acceptedAcrLevel = 'Level4';
const acceptedSigningAlgorithm = 'RS256';

let idportenIssuer;
let _remoteJWKSet;

//const IDPORTEN_WELL_KNOWN_URL="https://fakedings.dev-gcp.nais.io/fake/.well-known/openid-configuration"

export async function initIdporten() {
    if (process.env.NODE_ENV === 'labs-gcp') {
        // I labs så returnerer vi mock uansett
        return;
    }
    idportenIssuer = await Issuer.discover(process.env.IDPORTEN_WELL_KNOWN_URL);
    _remoteJWKSet = createRemoteJWKSet(new URL(idportenIssuer.metadata.jwks_uri));
}

export async function verifiserAccessToken(token) {
    const {payload} = await jwtVerify(token, _remoteJWKSet, {
        algorithms: [acceptedSigningAlgorithm],
        issuer: idportenIssuer.metadata.issuer,
    });

    if (payload.acr !== acceptedAcrLevel) {
        throw new Error('Invalid ACR-level');
    }
}
export async function getMockTokenFromIdporten() {
    return await (await fetch(process.env.FAKEDINGS_URL_IDPORTEN + '?acr=Level=4')).text();
}
