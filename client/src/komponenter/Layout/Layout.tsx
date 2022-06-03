import { DecoratorHeader } from "../decorator/DecoratorHeader";
import { DecoratorFooter } from "../decorator/DecoratorFooter";
import Head from "next/head";
import { DecoratorParts } from "../../utils/dekorator";
import { DecoratorEnv } from "../decorator/DecoratorEnv";
import React, { useRef } from "react";
import Banner from "../../Banner/Banner";
import { Heading, Ingress } from "@navikt/ds-react";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";

export const Layout = (props: {
  title: string;
  description: string;
  decoratorParts?: DecoratorParts;
  altinnOrganisasjoner: AltinnOrganisasjon[];
  children: React.ReactChild;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null);

  const headerLinks = (props.decoratorParts?.linkTags ?? []).map(
    ({ href, key, rel, sizes, type }, index) => {
      return (
        <link
          key={key}
          href={href ?? undefined}
          type={type ?? undefined}
          rel={rel ?? undefined}
          sizes={sizes ?? undefined}
        />
      );
    }
  );

  const banner = (
    <Banner
      tittelMedUnderTittel={
        <div>
          <Heading size="large" level="3">
            {props.title}
          </Heading>
          <Ingress>Inkluderende arbeidsliv</Ingress>
        </div>
      }
      altinnOrganisasjoner={props.altinnOrganisasjoner}
    />
  );

  return (
    <>
      <Head>
        {headerLinks}
          <link rel="icon" href="../public/favicon.ico" />
          <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <main>
        <div style={{ backgroundColor: "white" }}>
          <DecoratorHeader html={props.decoratorParts?.decoratorHeader ?? ""} />
        </div>
        <div id="app" className="app">
          {banner}
          <div>
            <div ref={layoutContentRef}>{props.children}</div>
          </div>
        </div>
        <footer>
          <DecoratorFooter html={props.decoratorParts?.decoratorFooter ?? ""} />
          <DecoratorEnv env={props.decoratorParts?.decoratorEnv} />
        </footer>
      </main>
    </>
  );
};
