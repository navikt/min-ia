import amplitude from 'amplitude-js'

export type EventProperties = { app: string, url: string, [key: string]: any }

function initializeNavDefaultAmplitudeClient(): AmplitudeClient {
    const amplitudeConfig = {
        apiEndpoint: 'amplitude.nav.no/collect-auto',
        saveEvents: false,
        includeUtm: true,
        includeReferrer: false,
        platform: window.location.toString(),
    }

    const amplitudeInstance = amplitude.getInstance();

    amplitudeInstance.init(
        'default', undefined, amplitudeConfig
    )

    return amplitudeInstance
}

export const navDefaultAmplitudeClient = initializeNavDefaultAmplitudeClient()

export interface AmplitudeClient {
    logEvent(eventName: string, eventProperties: EventProperties): void

    setUserProperties(properties: any): void
}

