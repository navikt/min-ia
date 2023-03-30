export const isMockApp = () => {
  return (
    process.env.NAIS_APP_NAME === "min-ia-mock" ||
    process.env.NAIS_APP_NAME === "min-ia-localhost"
  );
};
