import fetch from "node-fetch";
import {jwtVerify} from "jose";

const acceptedAcrLevel = 'Level4';
const acceptedSigningAlgorithm = 'RS256';

let idportenIssuer;
let _remoteJWKSet;

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
