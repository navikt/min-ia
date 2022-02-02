import {BASE_PATH} from "./backendApiProxy";

export const backendApiProxyMock = (app) => {
  console.log("========================================");
  console.log("========== Mock Backend API ============");
  console.log("===DETTE SKAL DU IKKE SE I PRODUKSJON===");
  console.log("========================================");

  app.get(`${BASE_PATH}/api/organisasjoner`, (request, response) => {
    response.send({
      Name: "FLESK OG FISK AS",
      Type: "Enterprise",
      OrganizationNumber: "111111111",
      OrganizationForm: "AS",
      Status: "Active",
      ParentOrganizationNumber: "",
    });
  });
};
