import React, { useRef } from "react";
import Banner from "../../Banner/Banner";
import { Heading, Ingress } from "@navikt/ds-react";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";
import { NotifikasjonWidgetProvider } from "@navikt/arbeidsgiver-notifikasjon-widget";

export const Layout = (props: {
  title: string;
  description: string;
  altinnOrganisasjoner: AltinnOrganisasjon[];
  kjørerMockApp: boolean
  children: React.ReactNode;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null);

  const banner = (
    <NotifikasjonWidgetProvider
      apiUrl={"/forebygge-fravar/notifikasjon-bruker-api"}
      miljo={props.kjørerMockApp ? "local" : "prod"}
    >
      <Banner
        tittelMedUnderTittel={
          <div>
            <Heading size="large" level="1">
              {props.title}
              <meta name="description" content={props.description} />
            </Heading>
            <Ingress>Inkluderende arbeidsliv</Ingress>
          </div>
        }
        altinnOrganisasjoner={props.altinnOrganisasjoner}
      />
    </NotifikasjonWidgetProvider>
  );

  return (
    <>
      <div id="app" className="app">
        <main id="maincontent" role="main" tabIndex={-1}>
          {banner}
          <div>
            <div ref={layoutContentRef}>{props.children}</div>
          </div>
        </main>
      </div>
    </>
  );
};
