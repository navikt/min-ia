import React, { useRef } from "react";
import Banner from "../../Banner/Banner";
import { Heading, Ingress } from "@navikt/ds-react";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";
import { NotifikasjonWidgetProvider } from "@navikt/arbeidsgiver-notifikasjon-widget";
import { AUTHENTICATED_BASE_PATH } from "../../utils/konstanter";
import '@navikt/arbeidsgiver-notifikasjon-widget/lib/esm/index.css';

export const Layout = (props: {
  title: string;
  description: string;
  altinnOrganisasjoner: AltinnOrganisasjon[];
  kjørerMockApp: boolean;
  children: React.ReactNode;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null)

  return (
    <main id="maincontent" role="main" tabIndex={-1}>
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
              <Ingress>Inkluderende arbeidsliv</Ingress>
            </div>
          }
          altinnOrganisasjoner={props.altinnOrganisasjoner}
        />
      </NotifikasjonWidgetProvider>
      <div ref={layoutContentRef}>{props.children}</div>
    </main>
  );
};
