import {mapStatusskodeTilRestStatus, RestStatus} from "./rest-status";

describe("mapTilRestStatus", () => {
  it("should map 200 to RestStatus.Suksess", () => {
    expect(mapStatusskodeTilRestStatus(200)).toEqual(RestStatus.Suksess);
  });

  it("should map 401 to RestStatus.IkkeInnlogget", () => {
    expect(mapStatusskodeTilRestStatus(401)).toEqual(RestStatus.IkkeInnlogget);
  });

  it("should map 403 to RestStatus.IngenTilgang", () => {
    expect(mapStatusskodeTilRestStatus(403)).toEqual(RestStatus.IngenTilgang);
  });

  it("should map other status codes to RestStatus.Feil", () => {
    expect(mapStatusskodeTilRestStatus(500)).toEqual(RestStatus.Feil);
    expect(mapStatusskodeTilRestStatus(404)).toEqual(RestStatus.Feil);
    expect(mapStatusskodeTilRestStatus(302)).toEqual(RestStatus.Feil);
  });
});
