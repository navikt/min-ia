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

server.get(`${basePath}/internal/isAlive`, (req, res) => {
    res.sendStatus(200);
});

server.get(`${basePath}/internal/isReady`, (req, res) => {
    res.sendStatus(200);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
