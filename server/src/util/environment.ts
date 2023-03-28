export const isMockApp = () => {
  return (
    process.env.NAIS_CLUSTER_NAME === "localhost" ||
    process.env.NAIS_APP_NAME === "min-ia-mock"
  );
};
