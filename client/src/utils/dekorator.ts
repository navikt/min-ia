import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import { cache } from './cache';
import { v4 as uuidv4 } from 'uuid';

export interface DecoratorParts {
    decoratorHeader: string;
    decoratorFooter: string;
    decoratorEnv: { dataSrc: string; scriptUrl: string };
    linkTags: LinkAttributes[];
    scriptTags: any[];
}

export interface Breadcrumb {
    title: string;
    url: string;
}

export interface DecoratorParams {
    siteTitle: string;
    cacheKey: string;
    breadcrumbs: Breadcrumb[];
}

interface QueryParam {
    feedback: boolean;
    chatbot: boolean;
    breadcrumbs: Breadcrumb[];
}

interface LinkAttributes {
    rel: string|null;
    href: string|null;
    sizes: string|null;
    type: string|null;
    key: string;
}

const getDecoratorCached = async (decoratorParams: DecoratorParams) => {
    return new Promise((resolve, reject) => {
        const decorator = cache.get(`decorator-cache-${decoratorParams.cacheKey}`);
        if (decorator) {
            resolve(decorator);
        } else {
            const queryParams: QueryParam = {
                feedback: false,
                chatbot: false,
                breadcrumbs: decoratorParams.breadcrumbs,
            };
            const queryString = Object.keys(queryParams)
                .map((key) => {
                    const value = queryParams[key as keyof QueryParam];
                    return key + '=' + JSON.stringify(value);
                })
                .join('&');
            const dekoratorUrl = process.env.DECORATOR_URL + '&' + queryString;
            fetch(dekoratorUrl)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(
                            `Klarte ikke hente dekoratør fra URL ${dekoratorUrl}. Feilkode: ${res.status}, feilmelding: ${res.statusText}. URL `
                        );
                    }
                    return res.text();
                })
                .then((body) => {
                    cache.set('decorator-cache', body);
                    resolve(body);
                })
                .catch((err) => {
                    console.error('Feilet med å hente dekoratør', err);
                    reject(err);
                });
        }
    });
};

const objHash = (obj: any): string => {
    const str = JSON.stringify(obj);
    return createHash('md5').update(str).digest('hex');
};

export const fetchDecoratorParts = async (
    decoratorParams: DecoratorParams
): Promise<DecoratorParts> => {
    const decoratorSrc = (await getDecoratorCached(decoratorParams)) as string;

    const $ = cheerio.load(decoratorSrc);

    const scriptTags: { [attr: string]: string }[] = [];
    $('#scripts script').each((index, element) => {
        const tagElement: cheerio.TagElement = element as cheerio.TagElement;
        tagElement.attribs.key = uuidv4();
        scriptTags.push({ ...tagElement.attribs });
    });
    $('#megamenu-resources script').each((index, element) => {
        const tagElement: cheerio.TagElement = element as cheerio.TagElement;
        tagElement.attribs.key = uuidv4();
        scriptTags.push({ ...tagElement.attribs });
    });

    const linkTags: LinkAttributes[] = [];
    $('#styles link').each((index, element) => {
        const tagElement: cheerio.TagElement = element as cheerio.TagElement;
        linkTags.push({
            key: uuidv4(),
            rel: tagElement.attribs.rel? tagElement.attribs.rel: null,
            href: tagElement.attribs.href? tagElement.attribs.href: null,
            sizes: tagElement.attribs.sizes? tagElement.attribs.sizes: null,
            type: tagElement.attribs.type? tagElement.attribs.type: null,
        })
    });
    $('#megamenu-resources link').each((index, element) => {
        const tagElement: cheerio.TagElement = element as cheerio.TagElement;
        linkTags.push({
            key: uuidv4(),
            rel: tagElement.attribs.rel? tagElement.attribs.rel: null,
            href: tagElement.attribs.href? tagElement.attribs.href: null,
            sizes: tagElement.attribs.sizes? tagElement.attribs.sizes: null,
            type: tagElement.attribs.type? tagElement.attribs.type: null,
        })
    });

    scriptTags.map((attrib) => {
        if (attrib.id === 'google-tag-manager-props') {
            attrib.defer = String(true);
            attrib.async = String(true);
        }
        if (attrib.src.indexOf('app.min.js')) {
            attrib.defer = String(true);
        }
    });

    return {
        decoratorHeader: $.html($('#decorator-header')),
        decoratorFooter: $.html($('#decorator-footer')),
        decoratorEnv: {
            //@ts-ignore
            dataSrc: $('#decorator-env').attr('data-src'),
            //@ts-ignore
            scriptUrl: $('#scripts script').attr('src'),
        },
        scriptTags: scriptTags,
        linkTags: linkTags,
    };
};
