import amplitude from "amplitude-js";
import { getMiljø, Miljø } from "../utils/miljøUtils";

const enum AmplitudeBucket {
  ARBEIDSGIVER_PROD = "a8243d37808422b4c768d31c88a22ef4",
  ARBEIDSGIVER_DEV = "6ed1f00aabc6ced4fd6fcb7fcdc01b30",
}

const getAmplitudeBucket = () => {
  return getMiljø() === Miljø.Prod
    ? AmplitudeBucket.ARBEIDSGIVER_PROD
    : AmplitudeBucket.ARBEIDSGIVER_DEV;
};

let initiated = false;
const initClient = () => {
  if (!initiated) {
    amplitude.getInstance().init(getAmplitudeBucket(), "", {
      apiEndpoint: "amplitude.nav.no/collect",
      saveEvents: false,
      includeUtm: true,
      batchEvents: false,
      includeReferrer: true,
    });
    initiated = true;
  }
};

const defaultEventData = {
  app: "forebygge-fravær",
  team: "teamia",
};

export default function logEvent(
  eventName: string,
  additionalEventData: any = {}
): Promise<any> {
  initClient();
  return new Promise(function (resolve) {
    amplitude
      .getInstance()
      .logEvent(
        eventName,
        { ...defaultEventData, ...additionalEventData },
        resolve
      );
  });
}
