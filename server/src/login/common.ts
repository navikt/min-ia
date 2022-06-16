import {APP_BASE_PATH} from "../config/meta";

export const getLoginTilOauth2 = (redirectUrl: string): string => {
    const referrerUrl = `${process.env.APP_INGRESS}/success?redirect=${redirectUrl}`;
    return `${APP_BASE_PATH}/oauth2/login?redirect=${referrerUrl}`;
};