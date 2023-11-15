import React from "react";
import styles from "./Oppgave.module.scss";
import { Button } from "@navikt/ds-react";
import {
  ArrowCirclepathIcon,
  CheckmarkIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { StatusType } from "../AktivitetData";
import { sendOppgaveStatusEvent } from "../../amplitude/events";

export function Statusendringsknapper({
  status,
  setNyStatus,
  oppgavetittel,
}: {
  status?: StatusType;
  setNyStatus: (nyStatus: StatusType) => void;
  oppgavetittel: string;
}) {
  switch (status) {
    case "AVBRUTT":
    case undefined:
      return (
        <Button
          variant="secondary"
          className={`${styles.statusknapp} ${styles.helknapp}`}
          onClick={() => {
            setNyStatus("STARTET");
            sendOppgaveStatusEvent("STARTET", oppgavetittel);
          }}
          icon={<ChevronDownIcon title="Start" />}
        >
          Start
        </Button>
      );
    case "STARTET":
      return (
        <div className={styles.multiknappholder}>
          <Button
            variant="secondary"
            className={`${styles.statusknapp} ${styles.halvknapp}`}
            onClick={() => {
              setNyStatus("FULLFØRT");
              sendOppgaveStatusEvent("FULLFØRT", oppgavetittel);
            }}
            icon={<CheckmarkIcon title="Fullfør" />}
          >
            Fullfør
          </Button>
          <Button
            variant="secondary-neutral"
            className={`${styles.statusknapp} ${styles.halvknapp}`}
            onClick={() => {
              setNyStatus("AVBRUTT");
              sendOppgaveStatusEvent("AVBRUTT", oppgavetittel);
            }}
            icon={<XMarkIcon title="Avbryt" />}
          >
            Avbryt
          </Button>
        </div>
      );
    case "FULLFØRT":
      return (
        <Button
          variant="secondary-neutral"
          className={`${styles.statusknapp} ${styles.helknapp}`}
          onClick={() => {
            setNyStatus("AVBRUTT");
            sendOppgaveStatusEvent("AVBRUTT", oppgavetittel);
          }}
          icon={<ArrowCirclepathIcon title="Tilbakestill" />}
        >
          Tilbakestill
        </Button>
      );
    default:
      return null;
  }
}
