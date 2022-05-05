import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { cache } from "./cache";
import { v4 as uuidv4 } from "uuid";

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
  urlLookupTable: boolean;
  feedback: boolean;
  chatbot: boolean;
  breadcrumbs: Breadcrumb[];
}

interface LinkAttributes {
  rel: string | null;
  href: string | null;
  sizes: string | null;
  type: string | null;
  key: string;
}

const getDecoratorCached = async (decoratorParams: DecoratorParams) => {
  return new Promise((resolve, reject) => {
    const decorator = cache.get(`decorator-cache-${decoratorParams.cacheKey}`);
    if (decorator) {
      resolve(decorator);
    } else {
      const queryParams: QueryParam = {
        urlLookupTable: false,
        feedback: false,
        chatbot: false,
        breadcrumbs:
          decoratorParams.breadcrumbs === undefined ||
          decoratorParams.breadcrumbs.length === 0
            ? []
            : decoratorParams.breadcrumbs,
      };
      const queryString = Object.keys(queryParams)
        .map((key) => {
          const value = queryParams[key as keyof QueryParam];
          return key + "=" + JSON.stringify(value);
        })
        .join("&");
      const dekoratorUrl = process.env.DECORATOR_URL + "&" + queryString;
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
          cache.set("decorator-cache", body);
          resolve(body);
        })
        .catch((err) => {
          console.error("Feilet med å hente dekoratør", err);
          reject(err);
        });
    }
  });
};

export const fetchDecoratorParts = async (
  decoratorParams: DecoratorParams
): Promise<DecoratorParts> => {
  const decoratorSrc = (await getDecoratorCached(decoratorParams)) as string;

  const $ = cheerio.load(decoratorSrc);

  const pageScriptTags: { [attr: string]: string }[] = [];

  const addToScriptTags = (
    index: number,
    element: cheerio.TagElement,
    scriptTags: { [p: string]: string }[]
  ) => {
    const tagElement: cheerio.TagElement = element;
    tagElement.attribs.key = uuidv4();
    scriptTags.push({ ...tagElement.attribs });
  };

  $("#scripts script").each((index, element) => {
    addToScriptTags(index, element as cheerio.TagElement, pageScriptTags);
  });
  $("#megamenu-resources script").each((index, element) => {
    addToScriptTags(index, element as cheerio.TagElement, pageScriptTags);
  });

  const pageLinkTags: LinkAttributes[] = [];
  const addToLinkTags = (
    index: number,
    element: cheerio.TagElement,
    linkTags: LinkAttributes[]
  ) => {
    const tagElement: cheerio.TagElement = element;
    linkTags.push({
      key: uuidv4(),
      rel: tagElement.attribs.rel ? tagElement.attribs.rel : null,
      href: tagElement.attribs.href ? tagElement.attribs.href : null,
      sizes: tagElement.attribs.sizes ? tagElement.attribs.sizes : null,
      type: tagElement.attribs.type ? tagElement.attribs.type : null,
    });
  };

  $("#styles link").each((index, element) => {
    addToLinkTags(index, element as cheerio.TagElement, pageLinkTags);
  });
  $("#megamenu-resources link").each((index, element) => {
    addToLinkTags(index, element as cheerio.TagElement, pageLinkTags);
  });

  pageScriptTags.forEach((attrib) => {
    if (attrib.id === "google-tag-manager-props") {
      attrib.defer = String(true);
      attrib.async = String(true);
    }
    if (attrib.src.indexOf("app.min.js")) {
      attrib.defer = String(true);
    }
  });

  return {
    decoratorHeader: $.html($("#decorator-header")),
    decoratorFooter: $.html($("#decorator-footer")),
    decoratorEnv: {
      //@ts-ignore
      dataSrc: $("#decorator-env").attr("data-src"),
      //@ts-ignore
      scriptUrl: $("#scripts script").attr("src"),
    },
    scriptTags: pageScriptTags,
    linkTags: pageLinkTags,
  };
};
