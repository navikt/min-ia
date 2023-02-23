const MIN_SIDE_ARBEIDSGIVER_URL = process.env.NEXT_PUBLIC__MIN_SIDE_ARBEIDSGIVER_URL || "#"

export const ManglerRettighetRedirect = () => {
  window?.location.replace(MIN_SIDE_ARBEIDSGIVER_URL);
  return null;
};
