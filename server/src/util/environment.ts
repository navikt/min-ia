export const isProduction = () => {
  return process.env.NAIS_CLUSTER_NAME === "prod-gcp";
};

export const isMockApp = () => {
  return process.env.NAIS_APP_NAME === "min-ia-mock";
};
