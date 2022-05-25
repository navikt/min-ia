export const QbrickNoPreloadConfig = `{
"controllers": [
    {
      "type": "View",
      "settings": {
        "layout": {
          "layers": [
            {
              "boxes": [
                {
                  "background-color": "black",
                  "height": "100%",
                  "left": "0%",
                  "moduleName": "MediaPlayer",
                  "top": "0%",
                  "width": "100%"
                }
              ]
            },
            {
              "boxes": [
                {
                  "height": "30%",
                  "left": "0%",
                  "moduleName": "Subtitles",
                  "bottom": "0%",
                  "width": "100%"
                }
              ]
            },
            {
              "boxes": [
                {
                  "height": "100%",
                  "left": "0%",
                  "moduleName": "Controls",
                  "bottom": "0%",
                  "width": "100%"
                }
              ]
            }
          ]
        }
      }
    }
  ],
  "modules": [
    {
      "type": "Analytics",
      "settings": {
        "trackers": [
          {
            "type": "Qbrick",
            "config": {
              "accountId": "763558"
            }
          }
        ]
      }
    },
    {
      "type": "Data"
    },
    {
      "type": "MediaPlayer",
      "settings": {
        "hlsJs": {
          "autoStartLoad": false
        }
      }
    },
    {
      "type": "Subtitles"
    },
    {
      "baseUrl": "//httpcache0-80659-cachedown0.dna.ip-only.net/80659-cachedown0/custom/modules/WCAG/",
      "classPath": "GoBrain.Customers.Qbrick.Modules.Controls",
      "type": "Controls",
      "settings": {
        "language": "no",
        "download": {
          "enabled": false
        },
        "sharing": {
          "enabled": false
        }
      }
    },
    {
      "type": "Titles"
    }
  ],
  "settings": {
    "autoplay": false,
    "repeat": false
  }
}
`;
