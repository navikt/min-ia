import { randomUUID } from "crypto";

export const createLogger = (correlationId?: string) => {
  return {
    log(message: string) {
      console.log(
        JSON.stringify({
          log: message,
          x_correlationId: correlationId ?? randomUUID(),
        })
      );
    },
  };
};
