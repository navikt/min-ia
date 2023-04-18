import { fetcher } from "./fetcher";
import { RestStatus } from "./rest-status";
import server from "../../__mocks__/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("fetcher", () => {
  it("should return data and status when successful", async () => {
    const result = await fetcher("/api/success");

    expect(result).toEqual({
      status: RestStatus.Suksess,
      data: { key: "value" },
    });
  });

  it("should return RestStatus.IkkeInnlogget status is 401", async () => {
    const result = await fetcher("/api/unauthorized");

    expect(result).toEqual({ status: RestStatus.IkkeInnlogget });
  });

  it("should return RestStatus.IngenTilgang when status is 403", async () => {
    const result = await fetcher("/api/forbidden");

    expect(result).toEqual({ status: RestStatus.IngenTilgang });
  });

  it("should return RestStatus.Feil for other statuses", async () => {
    const result = await fetcher("/api/internal-error");

    expect(result).toEqual({ status: RestStatus.Feil });
  });
});
