import styles from "./QbrickVideoPlayer.module.scss";
import React, { useEffect } from "react";
import { QbrickVideo } from "../utils/nettkurs-utils";

export interface QbrickVideoPlayerProps {
  video: QbrickVideo;
}

export const QbrickVideoPlayer = (props: QbrickVideoPlayerProps) => {
  useEffect(() => {
    // @ts-ignore
    if (window && window.GoBrain) {
      // @ts-ignore
      window.GoBrain.widgets(props.video.id).on("play", function () {
        // @ts-ignore
        const goBrainWidget = this;
        document.addEventListener("forcePausePlayer", function (evt) {
          goBrainWidget.pause();
        });
      });
    }
  }, [props.video.id]);

  const player = () => {
    return {
      __html: `<div data-gobrain-widgetId="${props.video.id}"
        data-gobrain-autoplay="false"  
        data-gobrain-repeat="false" 
        data-gobrain-moduleSettings="{&quot;TopControls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}},&quot;MobileControls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}" 
        data-gobrain-config="https://video.qbrick.com/play2/api/v1/accounts/763558/configurations/wcag2" 
        data-gobrain-data="https://video.qbrick.com/api/v1/public/accounts/763558/medias/${props.video.id}"></div>`,
    };
  };
  return (
    <>
      <div>{props.video?.metadata.title}</div>
      <div className={styles.videoContainer}>
        <div className={styles.video} dangerouslySetInnerHTML={player()} />
      </div>
    </>
  );
};
