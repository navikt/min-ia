import amplitude from "amplitude-js";

export type EventProperties = { app: string; url: string; [key: string]: any };
let initiated=false;
/*

function initializeNavDefaultAmplitudeClient(): AmplitudeClient | undefined {
  if (typeof window != "undefined") {
    const amplitudeConfig = {
      apiEndpoint: "amplitude.nav.no/collect-auto",
      saveEvents: false,
      includeUtm: true,
      includeReferrer: false,
      platform: window.location.toString(),
    };

    const amplitudeInstance = amplitude.getInstance();
    amplitudeInstance.init("default", undefined, amplitudeConfig);
    return amplitudeInstance;
  }
}

export const navDefaultAmplitudeClient = initializeNavDefaultAmplitudeClient();
*/
export interface AmplitudeClient {
  logEvent(eventName: string, eventProperties: EventProperties): void;

  setUserProperties(properties: any): void;
}

export default function logEvent(eventName: string, data?:any): Promise<any> {
  if(!initiated){
    amplitude.getInstance().init("default", '', {
      apiEndpoint: 'amplitude.nav.no/collect-auto',
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
        .logEvent(eventName,{app:'min-ia', ...data}, resolve);
  })

      }
