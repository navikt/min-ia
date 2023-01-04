import amplitude from "amplitude-js";


let initiated = false;
const initClientIfNeeded = () => {
    if (!initiated) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString().split('?')[0].split('#')[0],
        });
        initiated = true;
    }
};

export default function logEvent(
    eventName: string,
    eventData: any = {}
): Promise<any> {
    initClientIfNeeded();
    return new Promise(function (resolve) {
        amplitude
            .getInstance()
            .logEvent(
                eventName,
                {...eventData},
                resolve
            );
    });
}
