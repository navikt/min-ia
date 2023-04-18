import { mapTilRestStatus, RestStatus } from "./rest-status";

export async function fetcher(path: string) {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
  });

  const restStatus = mapTilRestStatus(response.status);

  if (restStatus === RestStatus.Suksess) {
    return {
      status: RestStatus.Suksess,
      data: await response.json(),
    };
  }
  return { status: restStatus };
}
