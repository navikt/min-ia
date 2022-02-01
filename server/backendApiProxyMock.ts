import express from "express";

// TODO: DELETE ME -- fungerer ikke å kjøre server.use(backendApiProxyMock) i server.ts
// TypeError [ERR_INVALID_MODULE_SPECIFIER]: Invalid module
const router = express.Router();
const basePath = "/min-ia";

// Local eller Labs
router.get(`${basePath}/api/organisasjoner`, (request, response) => {
  response.send({
    Name: "FLESK OG FISK AS",
    Type: "Enterprise",
    OrganizationNumber: "111111111",
    OrganizationForm: "AS",
    Status: "Active",
    ParentOrganizationNumber: "",
  });
});

export const backendApiProxyMock = router;
