import { DecoratorHeader } from "../decorator/DecoratorHeader";
import { DecoratorFooter } from "../decorator/DecoratorFooter";
import Head from "next/head";
import { DecoratorParts } from "../../utils/dekorator";
import { DecoratorEnv } from "../decorator/DecoratorEnv";
import React, { useRef } from "react";
import Banner from "../../Banner/Banner";
import { Heading, Ingress } from "@navikt/ds-react";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";

export const Layout2 = (props: {
  altinnOrganisasjoner: AltinnOrganisasjon[];
  children: React.ReactChild;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null);

  const banner = (
    <Banner
      tittelMedUnderTittel={
        <div>
          <Heading size="large" level="3">
            Dett er en test
          </Heading>
          <Ingress>Inkluderende arbeidsliv</Ingress>
        </div>
      }
      altinnOrganisasjoner={props.altinnOrganisasjoner}
    />
  );

  return (
    <>
      <div id="app" className="app">
        {banner}
        <div>
          <div ref={layoutContentRef}>{props.children}</div>
        </div>
      </div>
    </>
  );
};
