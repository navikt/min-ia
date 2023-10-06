import React, { FunctionComponent } from "react";
import { Table } from "@navikt/ds-react";
import Tabellrader from "./Tabellrader";
import {
  getHistorikkLabels,
  historikkHarOverordnetEnhet,
  HistorikkLabels,
  konverterTilKvartalsvisSammenligning,
  KvartalsvisSammenligning,
} from "../../../utils/sykefraværshistorikk-utils";
import {
  RestRessurs,
  RestStatus,
} from "../../../../../integrasjoner/rest-status";
import { KvartalsvisSykefraværshistorikk } from "../../../hooks/useSykefraværAppData";

export interface TabellProps {
  kvartalsvisSammenligning: KvartalsvisSammenligning[];
  harOverordnetEnhet: boolean;
  historikkLabels: HistorikkLabels;
}

const Tabell: FunctionComponent<TabellProps> = ({
  kvartalsvisSammenligning,
  historikkLabels,
  harOverordnetEnhet,
}) => {
  const headerOverordnetEnhet = () => {
    if (harOverordnetEnhet) {
      return (
        <Table.HeaderCell scope="col" align="right">
          Overordnet enhet: {historikkLabels.overordnetEnhet}
        </Table.HeaderCell>
      );
    }
  };

  return (
    <div className="graf-tabell__wrapper">
      <Table size="small" zebraStripes={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope={"col"}>År</Table.HeaderCell>
            <Table.HeaderCell scope="col">Kvartal</Table.HeaderCell>
            <Table.HeaderCell scope="col" align="right">
              {historikkLabels.virksomhet}
            </Table.HeaderCell>
            {headerOverordnetEnhet()}
            <Table.HeaderCell scope="col" align="right">
              Bransje: {historikkLabels.næringEllerBransje}
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" align="right">
              Sektor: {historikkLabels.sektor}
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" align="right">
              {historikkLabels.land}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            <Tabellrader
              kvartalsvisSammenligning={kvartalsvisSammenligning}
              harOverordnetEnhet={harOverordnetEnhet}
            />
          }
        </Table.Body>
      </Table>
    </div>
  );
};

export function hentTabellProps(
  restSykefraværsstatistikk: RestRessurs<KvartalsvisSykefraværshistorikk[]>
): TabellProps | undefined {
  if (restSykefraværsstatistikk.status === RestStatus.Suksess) {
    const harOverordnetEnhet = historikkHarOverordnetEnhet(
      restSykefraværsstatistikk.data
    );
    const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
      restSykefraværsstatistikk.data
    );
    const kvartalsvisSammenligningReversed =
      kvartalsvisSammenligning.toReversed();

    return {
      harOverordnetEnhet,
      historikkLabels,
      kvartalsvisSammenligning: kvartalsvisSammenligningReversed,
    };
  }
}

export default Tabell;
