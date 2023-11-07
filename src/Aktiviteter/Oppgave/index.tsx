import React from "react";
import { Heading } from "@navikt/ds-react";

import styles from "./Oppgave.module.scss";
import { AktivitetOppgaveType, StatusType } from "../AktivitetData";
import { Statusvisning } from "../Statusvisning";
import { AktivitetInnhold } from "../Aktiviteter";
import { KollapsbarOppgavetekstContainer } from "./KollapsbarOppgavetekstContainer";
import { Statusendringsknapper } from "./Statusendringsknapper";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Oppgave({ tittel, innhold, id }: AktivitetOppgaveType) {
  const status = ["AVBRUTT", "STARTET", "FULLFØRT", undefined][
    Math.floor(Math.random() * 4)
  ] as StatusType | undefined; //TODO

  return (
    <div className={styles.oppgaveblokk}>
      <div className={styles.oppgaveinnhold}>
        <div className={styles.oppgavetittel}>
          <Heading size={"medium"} level="4" spacing>
            {tittel}
          </Heading>
          <Statusvisning status={status} />
        </div>
        <KollapsbarOppgavetekstContainer
          status={status}
          knapper={
            <Statusendringsknapper
              status={status}
              oppgavetittel={tittel}
              setNyStatus={() => {}} //TODO
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
