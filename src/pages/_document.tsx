import {
  DecoratorComponentsReact,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";
import React, { ReactElement } from "react";
import { favicon_16x16_data, favicon_32x32_data } from "../utils/favicons";
import { isMockApp } from "../utils/envUtils";
import { Page } from "@navikt/ds-react";

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string,
) => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

interface Props {
  Decorator: DecoratorComponentsReact;
  language: string;
  kjørerMockApp: boolean;
}

const { decoratorEnv, thisPageUrl, umamiWebsiteId } =
  lesOgValiderMiljøvariablerForDekoratør();

export default class MyDocument extends Document<Props> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & Props> {
    const initialProps = await Document.getInitialProps(ctx);
    const Decorator = await fetchDecoratorReact({
      env: decoratorEnv,
      params: {
        chatbot: false,
        logoutWarning: true,
        redirectToApp: true,
        redirectToUrl: thisPageUrl,
        breadcrumbs: [
          {
            title: "Forebygge fravær",
            url: thisPageUrl ?? "",
          },
        ],
        context: "arbeidsgiver",
      },
    });

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language, kjørerMockApp: isMockApp() };
  }

  render(): ReactElement {
    const { Decorator, language, kjørerMockApp } = this.props;
    return (
      <Html lang={language || "no"}>
        <Head>
          {kjørerMockApp ? <meta name="robots" content="noindex" /> : undefined}
          {umamiWebsiteId && (
            <Script
              defer
              strategy="afterInteractive"
              src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
              data-host-url="https://umami.nav.no"
              data-website-id={umamiWebsiteId}
              data-exclude-search="true"
            />
          )}
          <Decorator.HeadAssets />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={favicon_32x32_data}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={favicon_16x16_data}
          />
        </Head>
        <Page as="body" style={{ backgroundColor: "var(--a-bg-subtle)" }}>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <Decorator.Scripts />
          <NextScript />
        </Page>
      </Html>
    );
  }
}

function lesOgValiderMiljøvariablerForDekoratør() {
  const decoratorEnv = process.env.DECORATOR_ENV as "prod" | "dev";
  const thisPageUrl = process.env.DECORATOR_BREADCRUMB_THIS_PAGE_URL;
  const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID;

  if (!decoratorEnv || !thisPageUrl) {
    throw Error(
      "Kunne ikke laste inn miljøvariabler for dekoratøren. Stopper bygget.",
    );
  }
  if (decoratorEnv != "prod" && decoratorEnv != "dev") {
    throw Error("Dekoratør-miljø kan kun være 'prod' eller 'dev'");
  }
  return { decoratorEnv, thisPageUrl, umamiWebsiteId };
}
