import React, { useRef } from "react";
import Banner from "../../Banner/Banner";
import {BodyLong, Heading} from "@navikt/ds-react";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";
import { NotifikasjonWidgetProvider } from "@navikt/arbeidsgiver-notifikasjon-widget";
import { AUTHENTICATED_BASE_PATH } from "../../utils/konstanter";

export const Layout = (props: {
  title: string;
  description: string;
  altinnOrganisasjoner: AltinnOrganisasjon[];
  kjørerMockApp: boolean;
  children: React.ReactNode;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null);

  const banner = (
    <NotifikasjonWidgetProvider
      apiUrl={`${AUTHENTICATED_BASE_PATH}/notifikasjoner`}
      miljo={props.kjørerMockApp ? "local" : "prod"}
    >
      <Banner
        tittelMedUnderTittel={
          <div>
            <Heading size="large" level="1">
              {props.title}
              <meta name="description" content={props.description} />
            </Heading>
            <BodyLong size="large">Inkluderende arbeidsliv</BodyLong>
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
