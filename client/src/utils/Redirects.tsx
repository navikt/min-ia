const minSideArbeidsgiverUrl = () => process.env.NEXT_PUBLIC__MIN_SIDE_ARBEIDSGIVER_URL || "#"

export const ManglerRettighetRedirect = () => {
  window?.location.replace(minSideArbeidsgiverUrl());
  return null;
};
