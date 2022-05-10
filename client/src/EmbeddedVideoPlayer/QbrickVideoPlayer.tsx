import styles from "./QbrickVideoPlayer.module.scss";
import { IAVideoer } from "../utils/nettkurs-utils";
import React, { useEffect, useState } from "react";
import {Button} from "@navikt/ds-react";

interface QbrickVideo {
  id: string;
  tags: string[];
  created: Date;
  updated: Date;
  nbOfViews: number; // via API-et?
  //thumbnailUrl: string;
  metadata: {
    title: string;
    description: string;
  };
}

interface QbrickVideoPreviewProps {
  video: QbrickVideo;
}

// Previews som vises i videolista
export const QbrickVideoPreview = (props: QbrickVideoPreviewProps) => {
  return <div>{props.video.metadata.title}</div>;
};

export interface QbrickVideoPlayerProps {
  videoId: string;
  video?: QbrickVideo;
}
export const QbrickVideoPlayer = (props: QbrickVideoPlayerProps) => {
  const [videoId, setVideoId] = useState(props.videoId);
  /*function rerenderAttempt(video:QbrickVideo){
  //  setVideo(video)
  }
  const[,updateVideo]=React.useState();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    setVideoId(props.videoId);
  }, [videoId]);
  setVideoId(props.videoId);
*/

  let widgetStopFunksjon:()=>{};
  const player2 = () => {
    return {
      __html: `<script src="https://play2.qbrick.com/framework/GoBrain.min.js"></script>
               <div id="divPageContainer">
                <div id="divPlayerContainer"></div>
               </div>
               <script type="text/javascript">
        var embedSettings = {
            config: '//video.qbrick.com/play2/api/v1/accounts/763558/configurations/wcag2',
            data: '//video.qbrick.com/api/v1/public/accounts/763558/medias/${videoId}',
            widgetId: '${videoId}',
        };
   
        GoBrain.create(document.getElementById('divPlayerContainer'), embedSettings)
            .on('initialized', function () {
                   console.log("mottatt pause signal");
                   console.log("this er:",this);
            //this.pause();
  });
    </script>
               </script>`,
    };
  };

  const player = () => {
    return {
      __html: `<div data-gobrain-widgetId="${videoId}"
        data-gobrain-autoplay="false"  
        data-gobrain-repeat="false" 
        data-gobrain-moduleSettings="{&quot;TopControls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}},&quot;MobileControls&quot;:{&quot;download&quot;:{&quot;enabled&quot;:false},&quot;sharing&quot;:{&quot;enabled&quot;:false}}}" 
        data-gobrain-config="https://video.qbrick.com/play2/api/v1/accounts/763558/configurations/wcag2" 
        data-gobrain-data="https://video.qbrick.com/api/v1/public/accounts/763558/medias/${videoId}"></div>
        <script src="https://play2.qbrick.com/framework/GoBrain.min.js"></script>`,
    };
  };
  return (
    <>
      <Button onClick={()=>{}}>Pause </Button>
      <div>Dette er video: ${props.videoId}</div>
      <div className={styles.videoContainer}>
        <div className={styles.video} dangerouslySetInnerHTML={player2()} />
      </div>
    </>
  );
};
