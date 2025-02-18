// "psplugin"/"vergic": skjermdelingsløsningen
// "hotjar" og "taskanalytics": verktøy for å samle inn brukerinnsikt

const cspHeaders = {
    "default-src": ["'self'", "*.nav.no"],
    "script-src": [
        "'self'",
        "static.hotjar.com",
        "script.hotjar.com",
        "*.psplugin.com",
        "*.nav.no",
        "*.taskanalytics.com",
        "'unsafe-eval'",
        "'unsafe-inline'",
        "https://widget.uxsignals.com"
    ],
    "style-src": [
        "'self'",
        "blob:",
        "*.nav.no",
        "*.psplugin.com",
        "'unsafe-inline'",
    ],
    "connect-src": [
        "'self'",
        "*.nav.no",
        "*.difi.no",
        "amplitude.nav.no",
        "*.psplugin.com",
        "*.hotjar.com",
        "*.hotjar.io",
        "https://api.uxsignals.com",
    ],
    "font-src": [
        "data:",
        "*.hotjar.com",
        "fonts.gstatic.com",
        "cdn.nav.no",
        "*.psplugin.com",
    ],
    "frame-src": ["vars.hotjar.com", "*.nav.no"],
    "img-src": [
        "'self'",
        "data:",
        "*.hotjar.com",
        "*.nav.no",
        "*.psplugin.com",
        "www.vergic.com",
        "https://widget.uxsignals.com",
    ],
    "manifest-src": ["'self'", "*.nav.no", "*.difi.no"],
    "media-src": ["'self'", "blob:"],
    "object-src": ["'self'", "blob:"],
    "worker-src": ["'self'", "blob:"],
};

const cspString = Object.entries(cspHeaders)
    .map((entry) => `${entry[0]} ${entry[1].join(" ")}`)
    .join("; ");

module.exports = {cspString};
