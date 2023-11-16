const cspHeaders = {
  "default-src": ["'self'", "*.nav.no"],
  "script-src": [
    "'self'",
    "static.hotjar.com",
    "script.hotjar.com",
    "*.psplugin.com",
    "*.nav.no",
  ],
  "style-src": ["'self'", "blob:", "*.nav.no", "*.psplugin.com"],
  "connect-src": [
    "'self'",
    "*.nav.no",
    "oidc-ver2.difi.no/idporten-oidc-provider/authorize",
    "idporten-ver2.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp4",
    "amplitude.nav.no",
    "*.psplugin.com",
    "*.hotjar.com",
    "*.hotjar.io",
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
    "*.hotjar.com",
    "*.nav.no",
    "*.psplugin.com",
    "www.vergic.com",
  ],
  "manifest-src": [
    "'self'",
    "www.nav.no",
    "oidc-ver2.difi.no",
    "idporten-ver2.difi.no",
  ],
  "media-src": ["'self'", "blob:"],
  "object-src": ["'self'", "blob:"],
  "worker-src": ["'self'", "blob:"],
};

export const cspString = Object.entries(cspHeaders)
  .map((entry) => `${entry[0]} ${entry[1].join(" ")}`)
  .join("; ");
