import { useEffect } from 'react';

export const DecoratorEnv = (props: { env?: { dataSrc: string; scriptUrl: string } }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = props.env?.scriptUrl ?? '';
        script.type = 'text/javascript';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const ps = document.querySelector('script[src$="ps.js"]');
            if (ps) {
                /* @ts-ignore */
                window.psPlugin = undefined;
                document.body.removeChild(ps);
            }

            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="scripts">
            <div id="decorator-env" data-src={props.env?.dataSrc ?? ''} />
        </div>
    );
};
