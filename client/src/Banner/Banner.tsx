import React from "react";
import Bedriftsmeny from "@navikt/bedriftsmeny";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../integrasjoner/rest-status";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { sendBedriftValgtEvent } from "../amplitude/events";

interface Props {
  tittelMedUnderTittel: string | JSX.Element;
  altinnOrganisasjoner: AltinnOrganisasjon[];
}

const Banner: React.FunctionComponent<Props & RouteComponentProps> = (
  props
) => {
  const { history, tittelMedUnderTittel, altinnOrganisasjoner } = props;

  return (
    <div>
      <Bedriftsmeny
        organisasjoner={altinnOrganisasjoner}
        sidetittel={tittelMedUnderTittel}
        history={history}
        onOrganisasjonChange={() => {
          sendBedriftValgtEvent();
        }}
      />
    </div>
  );
};

export default withRouter(Banner);
