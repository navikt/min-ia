import {mapTilRestStatus, RestStatus} from "./rest-status";

describe("mapTilRestStatus", () => {
  it("should map 200 to RestStatus.Suksess", () => {
    expect(mapTilRestStatus(200)).toEqual(RestStatus.Suksess);
  });

  it("should map 401 to RestStatus.IkkeInnlogget", () => {
    expect(mapTilRestStatus(401)).toEqual(RestStatus.IkkeInnlogget);
  });

  it("should map 403 to RestStatus.IngenTilgang", () => {
    expect(mapTilRestStatus(403)).toEqual(RestStatus.IngenTilgang);
  });

  it("should map other status codes to RestStatus.Feil", () => {
    expect(mapTilRestStatus(500)).toEqual(RestStatus.Feil);
    expect(mapTilRestStatus(404)).toEqual(RestStatus.Feil);
    expect(mapTilRestStatus(302)).toEqual(RestStatus.Feil);
  });
});
