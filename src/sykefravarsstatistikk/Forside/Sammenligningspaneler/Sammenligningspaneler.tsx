import React, { FunctionComponent, useEffect } from "react";
import { Sammenligningspanel } from "../SammenligningMedBransje/Sammenligningspanel";
import { SammenligningsType } from "../vurderingstekster";
import { Statistikkategori } from "../../domene/statistikkategori";
import { getBransjeEllerNæringKategori } from "./GetBransjeEllerNæringKategori";
import { Skeleton } from "@navikt/ds-react";
import { RestStatus } from "../../../integrasjoner/rest-status";
import { RestAggregertStatistikk } from "../../hooks/useSykefraværAppData";
import { sendDigitalIaTjenesteMetrikk } from "../../../integrasjoner/ia-tjenestemetrikker-api";
import { MetrikkKilde } from "@navikt/ia-metrikker-client";

interface Props {
  aggregertStatistikk: RestAggregertStatistikk;
  orgnr: string;
  skalSendeMetrikkerAutomatisk?: boolean;
}

export const Sammenligningspaneler: FunctionComponent<Props> = ({
  aggregertStatistikk,
  orgnr,
  skalSendeMetrikkerAutomatisk = true,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (skalSendeMetrikkerAutomatisk) {
        sendDigitalIaTjenesteMetrikk(MetrikkKilde.SYKEFRAVÆRSSTATISTIKK, orgnr);
      }
    }, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgnr]);

  if (
    aggregertStatistikk.restStatus === RestStatus.IngenTilgang ||
    aggregertStatistikk.restStatus === RestStatus.IkkeInnlogget
  ) {
    return null;
  }

  if (
    aggregertStatistikk.restStatus === RestStatus.LasterInn ||
    aggregertStatistikk.restStatus === RestStatus.IkkeLastet
  ) {
    return (
      <>
        <Skeleton variant="rectangle" height={352} />
        <Skeleton variant="rectangle" height={500} />
        <Skeleton variant="rectangle" height={351} />
        <Skeleton variant="rectangle" height={352} />
      </>
    );
  }

  const harBransje =
    getBransjeEllerNæringKategori(aggregertStatistikk) ===
    Statistikkategori.BRANSJE;

  const [virksomhet, bransjeEllerNæring] = [
    aggregertStatistikk.aggregertData?.get(Statistikkategori.VIRKSOMHET),
    aggregertStatistikk.aggregertData?.get(
      harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
    ),
  ];

  return (
    <>
      <Sammenligningspanel
        virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerTotalt}
        bransjeEllerNæringStatistikk={
          bransjeEllerNæring?.prosentSiste4KvartalerTotalt
        }
        sammenligningsType={SammenligningsType.TOTALT}
      />
      <Sammenligningspanel
        virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerGradert}
        bransjeEllerNæringStatistikk={
          bransjeEllerNæring?.prosentSiste4KvartalerGradert
        }
        sammenligningsType={SammenligningsType.GRADERT}
      />
      <Sammenligningspanel
        virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerKorttid}
        bransjeEllerNæringStatistikk={
          bransjeEllerNæring?.prosentSiste4KvartalerKorttid
        }
        sammenligningsType={SammenligningsType.KORTTID}
      />
      <Sammenligningspanel
        virksomhetStatistikk={virksomhet?.prosentSiste4KvartalerLangtid}
        bransjeEllerNæringStatistikk={
          bransjeEllerNæring?.prosentSiste4KvartalerLangtid
        }
        sammenligningsType={SammenligningsType.LANGTID}
      />
    </>
  );
};
