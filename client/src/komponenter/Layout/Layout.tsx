import {PageBanner} from '../PageBanner/PageBanner';
import {DecoratorHeader} from '../decorator/DecoratorHeader';
import {DecoratorFooter} from '../decorator/DecoratorFooter';
import Head from 'next/head';
import {DecoratorParts} from '../../utils/dekorator';
import {DecoratorEnv} from '../decorator/DecoratorEnv';
import React, {useRef} from 'react';
import {SCREEN_SM_MIN} from '../../utils/konstanter';
import {PageBannerSVG} from '../PageBanner/PageBannerSVG';
import classNames from 'classnames';

export const Layout = (props: {
    title: string;
    isFrontPage: boolean;
    bannerIconUrl?: string;
    decoratorParts?: DecoratorParts;
    children: React.ReactChild[];
}) => {
    const layoutContentRef = useRef<HTMLDivElement>(null);

    const headerLinks = (props.decoratorParts ? props.decoratorParts.linkTags : []).map(
        (attrs, index) => {
            return (
                <link
                    key={attrs.key}
                    href={attrs.href ? attrs.href : undefined}
                    type={attrs.type ? attrs.type : undefined}
                    rel={attrs.rel ? attrs.rel : undefined}
                    sizes={attrs.sizes ? attrs.sizes : undefined}
                />
            );
        }
    );

    return (
        <div>
            <Head>{headerLinks}</Head>
            <DecoratorHeader
                html={
                    props.decoratorParts?.decoratorHeader === undefined
                        ? ''
                        : props.decoratorParts?.decoratorHeader
                }
            />
            <div id="app" className="app">
                <PageBanner
                    isFrontPage={true}
                    title={props.title}
                    iconUrl={props.bannerIconUrl === undefined ? '' : props.bannerIconUrl}
                    kontekst={
                        'Min IA pageBanner'
                    }
                />
                <div>
                    <div ref={layoutContentRef}>
                        <div>
                            <PageBannerSVG/>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
            <DecoratorFooter
                html={
                    props.decoratorParts?.decoratorFooter === undefined
                        ? ''
                        : props.decoratorParts?.decoratorFooter
                }
            />
            <DecoratorEnv env={props.decoratorParts?.decoratorEnv}/>
        </div>
    );
};