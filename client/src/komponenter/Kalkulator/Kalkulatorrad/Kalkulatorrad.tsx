import React, { FunctionComponent, ReactElement } from "react";
import styles from "./Kalkulatorrad.module.scss";
import { useOrgnr } from "../../../hooks/useOrgnr";
import { sendInputfeltUtfyltEvent } from "../../../amplitude/events";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../../../integrasjoner/ia-tjenestemetrikker-api";
import { BodyLong, HelpText, Label, TextField } from "@navikt/ds-react";

interface Props {
  onChange: (event: any) => void;
  value: string | undefined;
  label: string;
  name: string;
  hjelpetekst?: string | ReactElement;
  placeholder?: string;
  visSpinner?: boolean;
}

export const Kalkulatorrad: FunctionComponent<Props> = (props) => {
  const labelId = props.name + "-label";
  const orgnr = useOrgnr();

  const onChangeEventHandler = (event: any) => {
    props.onChange(event);
    sendInputfeltUtfyltEvent(props.label, props.name);
    sendLevertInnloggetIaTjeneste(IaTjeneste.KALKULATOR, orgnr);
  };

  return (
    <div className={styles.kalkulatorrad}>
      <Label className={styles.label} id={labelId}>
        {props.label}
      </Label>
      <TextField
        type={"text"}
        inputMode={"numeric"}
        label=""
        onChange={onChangeEventHandler}
        value={props.value || ""}
        className={styles.input}
        placeholder={props.placeholder || "0"}
        aria-labelledby={labelId}
      />
      {/*{props.visSpinner && (*/}
      {/*  <Loader className={styles.spinner} transparent={true} />*/}
      {/*)}*/}
      <div className={styles.hjelpetekst_wrapper}>
        {props.hjelpetekst && (
          <HelpText>
            <BodyLong className={styles.hjelpetekst_innhold}>
              {props.hjelpetekst}
            </BodyLong>
          </HelpText>
        )}
      </div>
    </div>
  );
};
