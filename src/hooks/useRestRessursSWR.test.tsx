import { http } from "msw";
import { setupServer } from "msw/node";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { RestStatus, Suksess } from "../integrasjoner/rest-status";
import { render, waitFor } from "@testing-library/react";

const server = setupServer();
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const notSuksessResponse = (url: string, statusCode: number) => {
  return http.get(url, () => {
    return new Response(undefined, {
      headers: {
        "Content-Type": "application/json",
      },
      status: statusCode,
    });
  });
};

describe("useRestRessursSWR", () => {
  it("should initially have status LasterInn, then Suksess and data when fetch is successful", async () => {
    const suksessUrl = "https://dummy.api/suksess";

    server.use(
      http.get(suksessUrl, () => {
        return new Response(JSON.stringify({ key: "dummy data" }), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        });
      })
    );

    let result;
    const TestComponent = () => {
      result = useRestRessursSWR(suksessUrl, "Error fetching data");
      return null;
    };
    render(<TestComponent />);

    expect(result!.status).toEqual(RestStatus.LasterInn);

    await waitFor(() => {
      expect(result!.status).toEqual(RestStatus.Suksess);
    });

    expect((result! as Suksess<{ data: string }>).data).toEqual({
      key: "dummy data",
    });
  });

  it("should return status IngenTilgang when fetch returns 403", async () => {
    const ingenTilgangUrl = "https://dummy.api/ingen-tilgang";
    server.use(notSuksessResponse(ingenTilgangUrl, 403));

    let result;
    const TestComponent = () => {
      result = useRestRessursSWR(ingenTilgangUrl, "Error fetching data");
      return null;
    };
    render(<TestComponent />);

    await waitFor(() => {
      expect(result!.status).toEqual(RestStatus.IngenTilgang);
    });
  });

  it("should return status IkkeLastet when api url is null", async () => {
    let result;
    const TestComponent = () => {
      result = useRestRessursSWR(null, "Error fetching data");
      return null;
    };
    render(<TestComponent />);
    await waitFor(() => {
      expect(result!.status).toEqual(RestStatus.IkkeLastet);
    });
  });

  it("should return status Feil when resource is not found", async () => {
    server.use(
      http.get("https://dummy.api/404", () => {
        return new Response(undefined, {
          headers: {
            "Content-Type": "application/json",
          },
          status: 404,
        });
      })
    );

    let result;
    const TestComponent = () => {
      result = useRestRessursSWR(
        "https://dummy.api/404",
        "Error fetching data"
      );
      return null;
    };
    render(<TestComponent />);
    await waitFor(() => {
      expect(result!.status).toEqual(RestStatus.Feil);
    });
  });
});
