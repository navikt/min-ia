import express from "express";
import path from "path";
const basePath = "/min-ia";
const buildPath = path.resolve(__dirname, "../../client/dist");
const server = express();
const port = process.env.PORT || 8080;

server.use((req, res, next)=> {
    const { rawHeaders, httpVersion, method, socket, url } = req;
    console.log(`Mottatt følgende request: ${method} : ${url}`);
    next();
})

server.use(basePath, express.static(buildPath));
server.use("/assets", express.static(`${buildPath}/assets`));

server.get(`${basePath}/internal/isAlive`, (req, res) => {
    res.sendStatus(200);
});

server.get(`${basePath}/internal/isReady`, (req, res) => {
    res.sendStatus(200);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
