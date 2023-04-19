import { logger } from "../utils/logger";
import {
  mapStatusskodeTilRestStatus,
  RestRessurs,
  RestStatus,
} from "../integrasjoner/rest-status";
import useSWR from "swr";

export function useRestRessursSWR<T>(
  apiPath: string | null,
  errorMessage: string,
): RestRessurs<T> {
  const { data, error, isLoading } = useSWR(apiPath, fetcher);

  if (error) {
    logger.error(errorMessage);
    return { status: RestStatus.Feil };
  }
  if (isLoading) return { status: RestStatus.LasterInn };
  if (!data) {
    return { status: RestStatus.IkkeLastet };
  }
  return data;
}

async function fetcher(path: string) {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
  });

  const restStatus = mapStatusskodeTilRestStatus(response.status);
  if (restStatus === RestStatus.Suksess) {
    return {
      status: RestStatus.Suksess,
      data: await response.json(),
    };
  }
  return { status: restStatus };
}
