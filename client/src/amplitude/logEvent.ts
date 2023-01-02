import amplitude from "amplitude-js";


let initiated = false;
const initClientIfNeeded = () => {
    if (!initiated) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        });
        initiated = true;
    }
};

const defaultEventData = () => {
    return {
        app: "forebygge-fravær",
        team: "teamia",
        url: window.location.href,
    };
};

export default function logEvent(
    eventName: string,
    additionalEventData: any = {}
): Promise<any> {
    initClientIfNeeded();
    return new Promise(function (resolve) {
        amplitude
            .getInstance()
            .logEvent(
                eventName,
                {...defaultEventData(), ...additionalEventData},
                resolve
            );
    });
}
