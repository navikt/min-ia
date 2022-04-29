interface QbrickVideo {
  id: string;
  tags: string[];
  created: Date;
  updated: Date;
  nbOfViews: number; // via API-et?
  thumbnailUrl: string;
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
}
export const QbrickVideoPlayer = (props: QbrickVideoPlayerProps) => {
  const player = () => {
    const videoId: string = "bc3d3292-00015227-90d08ad0";
    return {
      __html: `<div data-gobrain-widgetId="player" 
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
        <div dangerouslySetInnerHTML={player()} />
      </>
  );
};
