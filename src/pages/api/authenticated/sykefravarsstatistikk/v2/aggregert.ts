import {NextApiRequest, NextApiResponse} from "next";
import {erGyldigOrgnr} from "../../../../../hooks/useOrgnr";
import proxyRequestWithTokenExchange from "../../../../../utils/api-proxy";
import {backendLogger} from "../../../../../utils/backendLogger";

/*
 *  Handler som mapper request til frackend (/api/authenticated/sykefravarsstatistikk/v2/aggregert?orgnr={orgnr}
 *   til pia-sykefravarsstistikk -> /sykefravarsstatistikk/{orgnr}/siste4kvartaler/aggregert
 *  Endepunktet returnerer aggregert sykefraværsstatistikk (siste 4 kvartaler)
 */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "GET")
        return res.status(405).json({error: "Method Not Allowed"});
    if (!req.query.orgnr)
        return res.status(400).json({error: "Mangler parameter 'orgnr'"});

    const erIProd = !(process.env.NAIS_CLUSTER_NAME === "dev-gcp" || process.env.NODE_ENV === "development");
    if (erIProd) {
        backendLogger.warn(`Endepunkt /v2/aggregert er ikke tilgjengelig i cluster '${process.env.NAIS_CLUSTER_NAME}' eller NODE_ENV '${process.env.NODE_ENV}'`);
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
        `${process.env.PIA_SYKEFRAVARSSTATISTIKK_HOSTNAME}`,
        `/sykefravarsstatistikk/${orgnr}/siste4kvartaler/aggregert`,
        process.env.PIA_SYKEFRAVARSSTATISTIKK_AUDIENCE,
        false,
    );
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
