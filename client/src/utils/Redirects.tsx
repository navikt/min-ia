import {getMinSideArbeidsgiverUrl} from "./miljøUtils";

export const ManglerRettighetRedirect = () => {
  const minSideUrl = getMinSideArbeidsgiverUrl();
  if (typeof window !== "undefined") {
    window.location.href= minSideUrl;
  }
  return null
};
