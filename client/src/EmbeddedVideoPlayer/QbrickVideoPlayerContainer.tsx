interface Props {
    children: React.ReactNode;
}
export const QbrickVideoPlayerContainer = (props: Props) => {
    const playerContainer = () => {
        //const videoId: string = "bc3d3292-00015227-90d08ad0";
        return {
            __html: `<script src="https://play2.qbrick.com/framework/GoBrain.min.js"></script>`,
        };
    };
    return (
        <>
            <div dangerouslySetInnerHTML={playerContainer()} />
            {props.children}
        </>
    );
};
