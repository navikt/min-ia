import { useRouter } from "next/router";

export const useOrgnr = (): string | undefined => {
  const router = useRouter();
  const bedrift = router.query.bedrift as string;

  if (bedrift === null) {
    return undefined;
  } else {
    return bedrift;
  }
};
