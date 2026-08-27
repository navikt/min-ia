import React, { useRef } from "react";
import Banner from "../Banner/Banner";
import { Heading } from "@navikt/ds-react";
import { Organisasjon } from "@navikt/virksomhetsvelger";

export const Layout = (props: {
  title: string;
  description: string;
  altinnOrganisasjoner: Organisasjon[];
  kjørerMockApp: boolean;
  children: React.ReactNode;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null);

  return (
    <main id="maincontent" role="main" tabIndex={-1}>
        <Banner
          tittelMedUnderTittel={
            <div>
              <Heading size="large" level="1">
                {props.title}
                <meta name="description" content={props.description} />
              </Heading>
            </div>
          }
          altinnOrganisasjoner={props.altinnOrganisasjoner}
        />
      <div ref={layoutContentRef}>{props.children}</div>
    </main>
  );
};
