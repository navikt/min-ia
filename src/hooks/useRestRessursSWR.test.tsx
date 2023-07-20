import { rest } from "msw";
import { setupServer } from "msw/node";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { RestStatus, Suksess } from "../integrasjoner/rest-status";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

const server = setupServer();
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderHookWithDummyData = (url: string | null) => {
  return renderHook(() => useRestRessursSWR(url, "Error fetching data"));
};

const notSuksessResponse = (url: string, statusCode: number) => {
  return rest.get(url, (req, res, ctx) => {
    return res(ctx.status(statusCode));
  });
};

describe("useRestRessursSWR", () => {
  it("should return LasterInn status while fetching data", async () => {
    const dummyUrl = "https://dummy.api/data";

    const { result } = renderHookWithDummyData(dummyUrl);

    expect(result.current.status).toEqual(RestStatus.LasterInn);
  });

  it("should return status Suksess and data when fetch is successful", async () => {
    const suksessUrl = "https://dummy.api/suksess";

    server.use(
      rest.get(suksessUrl, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ key: "dummy data" }));
      })
    );

    const { result } = renderHookWithDummyData(suksessUrl);

    await waitFor(() => {
      expect(result.current.status).toEqual(RestStatus.Suksess);
    });

    expect((result.current as Suksess<{ data: string }>).data).toEqual({
      key: "dummy data",
    });
  });

  it("should return status IngenTilgang when fetch returns 403", async () => {
    const ingenTilgangUrl = "https://dummy.api/ingen-tilgang";
    server.use(notSuksessResponse(ingenTilgangUrl, 403));

    const { result } = renderHookWithDummyData(ingenTilgangUrl);
    await waitFor(() => {
      expect(result.current.status).toEqual(RestStatus.IngenTilgang);
    });
  });

  it("should return status IkkeLastet when api url is null", async () => {
    const { result } = renderHookWithDummyData(null);
    await waitFor(() => {
      expect(result.current.status).toEqual(RestStatus.IkkeLastet);
    });
  });

  it("should return status Feil when resource is not found", async () => {
    const { result } = renderHookWithDummyData("https://dummy.api/404");
    await waitFor(() => {
      expect(result.current.status).toEqual(RestStatus.Feil);
    });
  });
});
