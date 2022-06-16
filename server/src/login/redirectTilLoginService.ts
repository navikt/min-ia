import {logger} from "../util/logger";
import {Request} from "express";
import {getLoginTilOauth2} from "./common";

export function redirectToLogin(req, res) {
    const loginTilOauth2 = getLoginTilOauth2(makeRedirectString(req));
    logger.info("Redirect til: " + loginTilOauth2);
    res.redirect(loginTilOauth2);
}

const makeRedirectString = (request: Request) => {
    let redirect: string = request.query.redirect
        ? (request.query.redirect as string)
        : process.env.APP_INGRESS;

    if (!redirect.startsWith(process.env.APP_INGRESS)) {
        logger.warning(
            "Redirect starter ikke med APP_INGRESS, oppdaterer til " +
            process.env.APP_INGRESS
        );
        redirect = process.env.APP_INGRESS;
    }
    return redirect;
};
