import amplitude from "amplitude-js";

let initiated = false;

export default function logEvent(eventName: string, data?: any): Promise<any> {
  if (!initiated) {
    amplitude.getInstance().init("default", "", {
      apiEndpoint: "amplitude.nav.no/collect-auto",
      saveEvents: false,
      includeUtm: true,
      includeReferrer: false,
      platform: window.location.toString(),
    });
    initiated = true;
  }
  return new Promise(function (resolve) {
    amplitude
      .getInstance()
      .logEvent(eventName,  {...data} , resolve);
  });
}
