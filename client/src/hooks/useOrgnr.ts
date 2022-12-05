import { useRouter } from "next/router";

export const useOrgnr = (): string | undefined => {
  const router = useRouter();
  const bedrift = router?.query.bedrift as string;

  if (bedrift === null) {
    return undefined;
  } else if (bedrift !== undefined && bedrift.length !== 9) {
    return undefined;
  } else {
    return bedrift;
  }
};
