const MIN_SIDE_ARBEIDSGIVER_URL = process.env.NEXT_PUBLIC_MIN_SIDE_ARBEIDSGIVER_URL || "#"

export const ManglerRettighetRedirect = () => {
  window?.location.replace(MIN_SIDE_ARBEIDSGIVER_URL);
  return null;
};
