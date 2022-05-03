import amplitude from "amplitude-js";

let initiated = false;
const initClient = () => {
  if (!initiated) {
    amplitude.getInstance().init("default", "", {
      apiEndpoint: "amplitude.nav.no/collect-auto",
      saveEvents: false,
      includeUtm: true,
      includeReferrer: true,
      platform: window.location.toString(),
    });
    initiated = true;
  }
};

export default function logEvent(eventName: string, data?: any): Promise<any> {
  initClient();
  return new Promise(function (resolve) {
    amplitude.getInstance().logEvent(eventName, { ...data }, resolve);
  });
}
