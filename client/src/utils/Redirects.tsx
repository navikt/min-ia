import { getMinSideArbeidsgiverUrl } from "./miljøUtils";

export const ManglerRettighetRedirect = () => {
  const minSideUrl = getMinSideArbeidsgiverUrl();
  window?.location.replace(minSideUrl);
  return null;
};
