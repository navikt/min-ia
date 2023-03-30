export const isMockApp = () => {
  return (
    process.env.NAIS_APP_NAME === "min-ia-mock" ||
    process.env.NODE_ENV === "development"
  );
};
