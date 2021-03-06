import React, { useRef } from "react";
import Banner from "../../Banner/Banner";
import { Heading, Ingress } from "@navikt/ds-react";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";

export const Layout = (props: {
  title: string;
  description: string;
  altinnOrganisasjoner: AltinnOrganisasjon[];
  children: React.ReactChild;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null);

  const banner = (
    <Banner
      tittelMedUnderTittel={
        <div>
          <Heading size="large" level="3">
            {props.title}
            <meta name="description" content={props.description} />
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
