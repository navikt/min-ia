import logEvent from "./client";

export const mockAmplitudeClient= {
  setUserProperties(properties: any) {
    console.log("setUserProperties ble kalt med ", properties);
  },
  logEvent(eventName: string, data?: any) {
    console.log(
      "logEvent ble kalt med eventName ",
      eventName,
      " og eventProperties ",
      data
    );
  },
};
