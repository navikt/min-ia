const logKibanaFriendly = (
  level: string,
  message: string,
  correlationId?: string
) => {
  process.stdout.write(
    JSON.stringify({
      level,
      message,
      correlationId,
    })
  );
};

const createKibanaFriendlyLogger = (correlationId?: string) => {
  return {
    warning(message: string) {
      logKibanaFriendly("Warning", message, correlationId);
    },
    info(message: string) {
      logKibanaFriendly("Info", message, correlationId);
    },
    debug(message: string) {
      logKibanaFriendly("Debug", message, correlationId);
    },
  };
};

export const logger = createKibanaFriendlyLogger();
