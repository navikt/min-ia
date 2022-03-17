import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";

const appIngress = process.env.APP_INGRESS || "FANT IKKE APP_INGRESS";
const loginUrl = process.env.LOGIN_URL || "FANT IKKE LOGIN_URL";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log("Håndterer /success");
  const harIdToken: boolean =
    request.cookies !== undefined &&
    request.cookies["selvbetjening-idtoken"] !== undefined;
  console.log("Har vi idtoken cookie? ", harIdToken);

  const loginserviceToken = request.cookies["selvbetjening-idtoken"];
  const redirectString = request.query.redirect as string;

  if (loginserviceToken && redirectString.startsWith(appIngress)) {
    console.log("[DEBUG] Case #1 -- Skal redirecte til: ", redirectString);
    response.redirect(redirectString);
  } else if (redirectString.startsWith(appIngress)) {
    const url = `${loginUrl}${redirectString}`;
    console.log("[DEBUG] Case #2 -- Skal redirecte til: ", url);
    response.redirect(url);
  } else {
    const url1 = `${loginUrl}${appIngress}`;
    console.log("[DEBUG] Case #3 -- Skal redirecte til: ", url1);
    response.redirect(url1);
  }
}
