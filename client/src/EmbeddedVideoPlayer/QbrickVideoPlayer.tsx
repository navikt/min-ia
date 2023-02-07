import styles from "./QbrickVideoPlayer.module.scss";
import React, { useEffect } from "react";
import { QbrickVideo } from "../utils/nettkurs-utils";
import { BASE_PATH } from "../utils/konstanter";
import { NotifikasjonWidget } from "@navikt/arbeidsgiver-notifikasjon-widget";

export interface QbrickVideoPlayerProps {
    video: QbrickVideo;
}

export const QbrickVideoPlayer = (props: QbrickVideoPlayerProps) => {
    useEffect(() => {
        // @ts-ignore
        if (window && window.GoBrain) {
            // @ts-ignore
            let w1 = window.GoBrain.widgets(props.video.id)
            // @ts-ignore
            if (w1) {
                // @ts-ignore
                w1.on("play", function () {
                    // @ts-ignore
                    const goBrainWidget = this;
                    document.addEventListener("forcePausePlayer", function (evt) {
                        goBrainWidget.pause();
                    });
                    document.dispatchEvent(new CustomEvent("videoAvspilles"));
                });
            }
        }
    }, [props.video.id]);

    var moduleSettings = {
        modules: [
            {
                "type": "MediaPlayer",
                "settings": {
                    "hlsJs": {
                        "autoStartLoad": false
                    }
                }
            }
        ],
        "TopControls":
        {
            "download": {
                "enabled": false
            },
            "sharing": { "enabled": false }
        },
        "MobileControls": {
            "download": {
                "enabled": false
            },
            "sharing": {
                "enabled": false
            }
        }
    };

    var moduleSettingsString = JSON.stringify(moduleSettings);
    moduleSettingsString = moduleSettingsString.replace(/"/g, "&quot;");


    function player(): { __html: string; } {
        return {
            __html: `<div data-gobrain-widgetId="${props.video.id}"
        data-gobrain-language="nb" 
        data-gobrain-autoplay="false"  
        data-gobrain-repeat="false" 
        data-gobrain-moduleSettings="${moduleSettingsString}" 
        data-gobrain-config="https://video.qbrick.com/play2/api/v1/accounts/763558/configurations/qbrick-player"
        data-gobrain-data="https://video.qbrick.com/api/v1/public/accounts/763558/medias/${props.video.id}"></div>`,
        };
    }
    return (
        <div className={styles.videoContainer}>
            <div className={styles.video} dangerouslySetInnerHTML={player()} />
        </div>
    );
};
