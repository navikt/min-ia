import { logger } from "../utils/logger";
import {
  mapStatusskodeTilRestStatus,
  RestRessurs,
  RestStatus,
} from "../integrasjoner/rest-status";
import useSWR from "swr";

export function useRestRessursSWR<T>(
  apiPath: string | null,
  errorMessage: string
): RestRessurs<T> {
  const { data, error, isLoading } = useSWR(apiPath, fetcher, {
    revalidateIfStale: false,
  });

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
  return restStatus === RestStatus.Suksess
    ? { status: restStatus, data: await response.json() }
    : { status: restStatus };
}
