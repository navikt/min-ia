import styles from "./QbrickVideoPlayer.module.scss";
import React, { useEffect, useRef } from "react";
import { QbrickVideo } from "../utils/nettkurs-utils";
import { BASE_PATH } from "../utils/konstanter";
import {
  IaTjeneste,
  registrerLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";
import { useOrgnr } from "../hooks/useOrgnr";

export interface QbrickVideoPlayerProps {
  video: QbrickVideo;
}

export const QbrickVideoPlayer = (props: QbrickVideoPlayerProps) => {
  const orgnr = useOrgnr();
  const nettkursMetrikkSendt = useRef(false);
  useEffect(() => {
    // @ts-ignore
    if (window && window.GoBrain) {
      // @ts-ignore
      window.GoBrain.widgets(props.video.id).on("play", function () {
        if (!nettkursMetrikkSendt.current) {
          registrerLevertInnloggetIaTjeneste(IaTjeneste.NETTKURS, orgnr).then(
            () => {
              nettkursMetrikkSendt.current = true;
            }
          );
        }
        // @ts-ignore
        const goBrainWidget = this;
        document.addEventListener("forcePausePlayer", function (evt) {
          goBrainWidget.pause();
        });
      });
    }
  }, [orgnr, props.video.id]);

  const player = () => {
    return {
      __html: `<div data-gobrain-widgetId="${props.video.id}"
        data-gobrain-autoplay="false"  
        data-gobrain-repeat="false" 
        data-gobrain-moduleSettings="{&quot;TopControls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}},&quot;MobileControls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}" 
        data-gobrain-config="${BASE_PATH}/qbrick/config/no-preload" 
        data-gobrain-data="https://video.qbrick.com/api/v1/public/accounts/763558/medias/${props.video.id}"></div>`,
    };
  };
  return (
    <div className={styles.videoContainer}>
      <div className={styles.video} dangerouslySetInnerHTML={player()} />
    </div>
  );
};
