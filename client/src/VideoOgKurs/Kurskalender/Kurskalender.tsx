import React from "react";
import { getNesteNettkurs } from "../../utils/kurs-utils";
import { NesteNettkurs } from "../NesteNettkurs/NesteNettkurs";
import { Kurspåmelding } from "../Kurspåmelding/Kurspåmelding";
import { Heading } from "@navikt/ds-react";
import styles from "./kurskalender.module.scss";
import { useKursoversikt } from "../../hooks/useKursoversikt";

const Kurskalender = () => {
  const kurs = useKursoversikt();

  const nesteNettkurs = getNesteNettkurs(kurs);
  return (
    <div className={styles.kurskalender}>
      <Heading
        size={"large"}
        level={"2"}
        className={styles.kurskalender__tittel}
      >
        Vil du delta på kurs?
      </Heading>
      <NesteNettkurs nesteNettkurs={nesteNettkurs} />
      <Kurspåmelding finnesKommendeNettkurs={nesteNettkurs != null} />
    </div>
  );
};
export default Kurskalender;
