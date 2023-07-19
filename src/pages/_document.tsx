import {
  Components,
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
import React from "react";
import { favicon_16x16_data, favicon_32x32_data } from "../utils/favicons";

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string
) => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

interface Props {
  Decorator: Components;
  language: string;
}

const { decoratorEnv, thisPageUrl } = lesOgValiderMiljøvariablerForDekoratør();

export default class MyDocument extends Document<Props> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & Props> {
    const initialProps = await Document.getInitialProps(ctx);
    const Decorator = await fetchDecoratorReact({
      env: decoratorEnv,
      chatbot: false,
      urlLookupTable: false,
      redirectToApp: true,
      redirectToUrl: thisPageUrl,
      breadcrumbs: [
        {
          title: "Forebygge fravær",
          url: thisPageUrl ?? "",
        },
      ],
      context: "arbeidsgiver",
    });

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language };
  }

  render(): JSX.Element {
    const { Decorator, language } = this.props;
    return (
      <Html lang={language || "no"}>
        <Head>
          <Decorator.Styles />
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
        <body>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <Decorator.Scripts />
          <NextScript />
        </body>
      </Html>
    );
  }
}

function lesOgValiderMiljøvariablerForDekoratør() {
  const decoratorEnv = process.env.DECORATOR_ENV as "prod" | "dev";
  const thisPageUrl = process.env.DECORATOR_BREADCRUMB_THIS_PAGE_URL;

  if (!decoratorEnv || !thisPageUrl) {
    throw Error(
      "Kunne ikke laste inn miljøvariabler for dekoratøren. Stopper bygget."
    );
  }
  if (decoratorEnv != "prod" && decoratorEnv != "dev") {
    throw Error("Dekoratør-miljø kan kun være 'prod' eller 'dev'");
  }
  return { decoratorEnv, thisPageUrl };
}
