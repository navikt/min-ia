import React from "react";
import { Heading } from "@navikt/ds-react";

import styles from "./Oppgave.module.scss";
import { AktivitetOppgaveType } from "../AktivitetData";
import { Statusvisning } from "../Statusvisning";
import { AktivitetInnhold } from "../Aktiviteter";
import { KollapsbarOppgavetekstContainer } from "./KollapsbarOppgavetekstContainer";
import { Statusendringsknapper } from "./Statusendringsknapper";
import {
  useOppdaterStatus,
  useStatusForAktivitet,
} from "../context/aktivitetStatus";
import { useOrgnr } from "../../hooks/useOrgnr";

export default function Oppgave({ tittel, innhold, id }: AktivitetOppgaveType) {
  const status = useStatusForAktivitet(id);
  const orgnr = useOrgnr();
  const setStatus = useOppdaterStatus(orgnr, id);

  return (
    <div className={styles.oppgaveblokk}>
      <div className={styles.oppgaveinnhold}>
        <div className={styles.oppgavetittel}>
          <Heading size={"medium"} level="2" spacing>
            {tittel}
          </Heading>
          <Statusvisning status={status} />
        </div>
        <KollapsbarOppgavetekstContainer
          status={status}
          knapper={
            <Statusendringsknapper
              status={status}
              setNyStatus={setStatus}
              oppgavetittel={tittel}
            />
          }
        >
          {innhold.map((innhold, index) => (
            <AktivitetInnhold key={index} innhold={innhold} />
          ))}
        </KollapsbarOppgavetekstContainer>
      </div>
    </div>
  );
}
