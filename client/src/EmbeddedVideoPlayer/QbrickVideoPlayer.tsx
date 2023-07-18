import styles from "./QbrickVideoPlayer.module.scss";
import React, { useRef } from "react";
import { QbrickVideo } from "../utils/nettkurs-utils";

export interface QbrickVideoPlayerProps {
  video: QbrickVideo;
}

export const QbrickVideoPlayer = (props: QbrickVideoPlayerProps) => {
  const video = useRef<HTMLDivElement>(null);

  const moduleSettings = {
    modules: [
      {
        type: "MediaPlayer",
        settings: {
          hlsJs: {
            autoStartLoad: false,
          },
        },
      },
    ],
    TopControls: {
      download: {
        enabled: false,
      },
      sharing: { enabled: false },
    },
    MobileControls: {
      download: {
        enabled: false,
      },
      sharing: {
        enabled: false,
      },
    },
  };

  const gobrainWidgetId = `gobrain-widget-id-${props.video.id}`;
  const canCreateVideoPlayer =
    video.current !== null &&
    // eslint-disable-next-line
    // @ts-ignore
    window?.GoBrain?.Dtos?.Settings?.Embed &&
    // eslint-disable-next-line
    // @ts-ignore
    !window?.GoBrain?.widgets(gobrainWidgetId);

  if (canCreateVideoPlayer) {
    // eslint-disable-next-line
    // @ts-ignore
    const embedSettings = new window.GoBrain.Dtos.Settings.Embed();
    embedSettings.widgetId = gobrainWidgetId;
    embedSettings.language = "nb";
    embedSettings.autoplay = false;
    embedSettings.repeat = false;
    embedSettings.moduleSettings = moduleSettings;
    embedSettings.config =
      "https://video.qbrick.com/play2/api/v1/accounts/763558/configurations/qbrick-player";
    embedSettings.data = `https://video.qbrick.com/api/v1/public/accounts/763558/medias/${props.video.id}`;

    // eslint-disable-next-line
    // @ts-ignore
    const widget = window.GoBrain.create(video.current, embedSettings);
    widget.on("play", function () {
      document.addEventListener("forcePausePlayer", function () {
        widget.pause();
      });
      document.dispatchEvent(new CustomEvent("videoAvspilles"));
    });
  }

  return (
    <div className={styles.videoContainer}>
      <div className={styles.video}>
        <div className={styles.gobrainWidgetTarget} ref={video} />
      </div>
    </div>
  );
};
