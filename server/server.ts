import express from "express";
import path from "path";

const basePath = "/min-ia";
const buildPath = process.env.NODE_ENV === 'development' ?
    path.resolve(__dirname, "../client/dist")
    : path.resolve(__dirname, "../../client/dist");
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("buildPath", buildPath);
const server = express();
const port = process.env.PORT || 8080;

server.use(basePath, express.static(buildPath));
server.use("/assets", express.static(`${buildPath}/assets`));

server.get(`${basePath}/redirect-til-login`, (req, res) => {
    const referrerUrl = `${process.env.APP_INGRESS}/success?redirect=${req.query.redirect}`;
    res.redirect(basePath + `/oauth2/login?redirect=${referrerUrl}`);
});

server.get(`${basePath}/success`, (req, res) => {
    const loginserviceToken = req.cookies['selvbetjening-idtoken'];
    const redirectString=req.query.redirect as string;
    if (loginserviceToken && redirectString.startsWith(process.env.APP_INGRESS)) {
        res.redirect(redirectString);
    } else if (redirectString.startsWith(process.env.APP_INGRESS)) {
        res.redirect(`${process.env.LOGIN_URL}${req.query.redirect}`);
    } else {
        res.redirect(`${process.env.LOGIN_URL}${process.env.APP_INGRESS}`);
    }
});
server.get(`${basePath}/internal/isAlive`, (req, res) => {
    res.sendStatus(200);
});

server.get(`${basePath}/internal/isReady`, (req, res) => {
    res.sendStatus(200);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
