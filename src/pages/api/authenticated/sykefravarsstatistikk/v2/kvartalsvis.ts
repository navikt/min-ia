import {NextApiRequest, NextApiResponse} from "next";
import {erGyldigOrgnr} from "../../../../../hooks/useOrgnr";
import proxyRequestWithTokenExchange from "../../../../../utils/api-proxy";
import {backendLogger} from "../../../../../utils/backendLogger";

/*
 *  Handler som mapper request til frackend (/api/authenticated/sykefravarsstatistikk/v2/kvartalsvis?orgnr={orgnr}
 *   til pia-sykefravarsstistikk -> /{orgnr}/sykefravarshistorikk/kvartalsvis
 *  Endepunktet returnerer sykefraværsstatistikk per kvartal (siste 5 årene)
 */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET")
        return res.status(405).json({error: "Method Not Allowed"});
    if (!req.query.orgnr)
        return res.status(400).json({error: "Mangler parameter 'orgnr'"});

    const erIProd = !(process.env.NAIS_CLUSTER_NAME === "dev-gcp" || process.env.NODE_ENV === "development");
    if (erIProd) {
        backendLogger.warn(`Endepunkt /kvartalsvis er ikke tilgjengelig i cluster '${process.env.NAIS_CLUSTER_NAME}' eller NODE_ENV '${process.env.NODE_ENV}'`);
        return res.status(400).json({
            error: "Endepunkt er ikke tilgjengelig"
        });
    }

    const orgnr = req.query.orgnr as string;
    if (!erGyldigOrgnr(orgnr)) {
        return res.status(400).json({error: "Ugyldig orgnr"});
    }

    return await proxyRequestWithTokenExchange(
        req,
        res,
        `${process.env.SYKEFRAVARSSTATISTIKK_API_HOSTNAME}`,
        `/sykefravarsstatistikk/${orgnr}/historikk/kvartalsvis`,
        process.env.PIA_SYKEFRAVARSSTATISTIKK_AUDIENCE,
        true
    );
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
