const logKibanaFriendly = (level: string, message: string) => {
  console.log(
    JSON.stringify({
      level,
      message,
    })
  );
};

const createKibanaFriendlyLogger = () => {
  return {
    warning(message: string) {
      logKibanaFriendly("Warning", message);
    },
    info(message: string) {
      logKibanaFriendly("Info", message);
    },
    debug(message: string) {
      logKibanaFriendly("Debug", message);
    },
  };
};

export const logger = createKibanaFriendlyLogger();
