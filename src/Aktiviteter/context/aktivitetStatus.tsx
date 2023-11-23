import React from "react";
import { StatusType } from "../AktivitetData";
import { AktivitetBrukerStatus } from "../../hooks/useHentAktiviteter";
import { oppdaterStatus } from "../status-klient";
import { sendIaMetrikkInteraksjonstjeneste } from "../../integrasjoner/ia-tjenestemetrikker-api";
import {
  AggregertStatistikkDto,
  tomtDataobjekt,
} from "../../integrasjoner/aggregert-statistikk-api";
import {MetrikkKilde} from "@navikt/ia-metrikker-client";

const AktivitetContext = React.createContext<{
  aktivitetStatuser: AktivitetBrukerStatus[];
  setLokaleEndringer: React.Dispatch<
    React.SetStateAction<{ aktivitetId: string; status: StatusType }[]>
  >;
  sykefraværsstatistikk: AggregertStatistikkDto;
}>({
  aktivitetStatuser: [],
  setLokaleEndringer: () => {},
  sykefraværsstatistikk: tomtDataobjekt,
});

export const AktivitetProvider = ({
  children,
  aktivitetStatuser,
  sykefraværsstatistikk,
}: {
  children: React.ReactNode;
  aktivitetStatuser: AktivitetBrukerStatus[];
  sykefraværsstatistikk: AggregertStatistikkDto;
}) => {
  const [lokaleEndringer, setLokaleEndringer] = React.useState<
    { aktivitetId: string; status: StatusType }[]
  >([]);
  const kombinerteAktivitetStatuser = React.useMemo(() => {
    const mineLokaleEndringer = [...lokaleEndringer];
    const nyeAktivitetStatuser = aktivitetStatuser.map((aktivitetStatus) => {
      const lokalEndringIndex = mineLokaleEndringer.findIndex(
        (endring) => endring.aktivitetId === aktivitetStatus.aktivitetId
      );
      if (lokalEndringIndex > -1) {
        const lokalEndring = mineLokaleEndringer[lokalEndringIndex];
        mineLokaleEndringer.splice(lokalEndringIndex, 1);

        return { ...aktivitetStatus, status: lokalEndring.status };
      }
      return aktivitetStatus;
    });

    for (let index = 0; index < mineLokaleEndringer.length; index++) {
      const element = mineLokaleEndringer[index];

      nyeAktivitetStatuser.push({
        aktivitetId: element.aktivitetId,
        aktivitetType: "OPPGAVE",
        status: element.status,
      });
    }

    return nyeAktivitetStatuser;
  }, [aktivitetStatuser, lokaleEndringer]);
  return (
    <AktivitetContext.Provider
      value={{
        aktivitetStatuser: kombinerteAktivitetStatuser,
        setLokaleEndringer,
        sykefraværsstatistikk,
      }}
    >
      {children}
    </AktivitetContext.Provider>
  );
};

export const useAktivitetStatuser = () => {
  const { aktivitetStatuser } = React.useContext(AktivitetContext);

  return { aktivitetStatuser };
};

export const useStatusForAktivitet = (id: string) => {
  const { aktivitetStatuser } = React.useContext(AktivitetContext);

  return aktivitetStatuser?.find((status) => status.aktivitetId === id)?.status;
};

export const useStatusForAktiviteter = (ider: string[]) => {
  const { aktivitetStatuser } = React.useContext(AktivitetContext);

  return ider.map(
    (id) =>
      aktivitetStatuser?.find((status) => status.aktivitetId === id)?.status
  );
};

export const useSykefraværsstatistikkForAktivitet = () => {
  const { sykefraværsstatistikk } = React.useContext(AktivitetContext);

  return sykefraværsstatistikk;
};

export const useOppdaterStatus = (
  orgnr: string | null | undefined,
  aktivitetId: string
) => {
  const { setLokaleEndringer } = React.useContext(AktivitetContext);

  return React.useCallback(
    (status: StatusType) => {
      if (orgnr) {
        oppdaterStatus(aktivitetId, orgnr, status);
        sendIaMetrikkInteraksjonstjeneste(MetrikkKilde.FOREBYGGINGSPLAN, orgnr);

        setLokaleEndringer((tidligereEndringer) => {
          const aktivitetIndex = tidligereEndringer.findIndex(
            (endring) => endring.aktivitetId === aktivitetId
          );

          if (aktivitetIndex > -1) {
            const nyeEndringer = [...tidligereEndringer];
            nyeEndringer[aktivitetIndex] = {
              ...tidligereEndringer[aktivitetIndex],
              aktivitetId,
              status,
            };
            return nyeEndringer;
          }
          return [
            ...tidligereEndringer,
            { aktivitetId, status, aktivitetType: "OPPGAVE" },
          ];
        });
      } else {
        console.error("Får ikke oppdatert status. Mangler orgnr.");
      }
    },
    [setLokaleEndringer, orgnr, aktivitetId]
  );
};
