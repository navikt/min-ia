import {logger} from "../util/logger";
import {getLoginTilOauth2} from "./common";
import {Request} from "express";

export function redirectTilAppHvisInnloggingOk(request, response) {
    const redirectString = request.query.redirect as string;

    if (
        harAuthorizationHeader(request) &&
        redirectString.startsWith(process.env.APP_INGRESS)
    ) {
        logger.info("Innlogging fullført, skal redirecte til: " + redirectString);
        response.redirect(redirectString);
    } else {
        const url = getLoginTilOauth2(process.env.APP_INGRESS);
        logger.info("Ingen gyldig Auth header, redirect til innlogging: " + url);
        response.redirect(url);
    }
}

const harAuthorizationHeader = (request: Request) => {
    return (
        request.headers["authorization"] &&
        request.headers["authorization"] !== undefined &&
        request.headers["authorization"]?.split(" ")[1]!.length > 0
    );
};