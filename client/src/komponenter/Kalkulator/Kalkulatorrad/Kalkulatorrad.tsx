import React, { FunctionComponent, ReactElement } from "react";
import styles from "./Kalkulatorrad.module.scss";
import { sendInputfeltUtfyltEvent } from "../../../amplitude/events";
import {BodyLong, HelpText, Label, ReadMore, TextField} from "@navikt/ds-react";

interface Props {
  onChange: (event: any) => void;
  value: string | undefined;
  label: string;
  name: string;
  hjelpetekst?: string ;
  readMore?: ReactElement;
  placeholder?: string;
  visLoader?: boolean;
}

export const Kalkulatorrad: FunctionComponent<Props> = (props) => {
  const labelId = props.name + "-label";

  return (
    <div className={styles.kalkulatorrad}>
      <Label className={styles.label} id={labelId}>
        {props.label}
      </Label>
      <TextField
        onChange={(event) => {
          props.onChange(event);
          sendInputfeltUtfyltEvent(props.label, props.name);
          document.dispatchEvent(new CustomEvent("inputfeltEndretAvBruker"));
        }}
        type={"text"}
        inputMode={"numeric"}
        label=""
        value={props.value || ""}
        className={styles.input}
        placeholder={props.placeholder || "0"}
        aria-labelledby={labelId}
      />
      <div className={styles.hjelpetekst_wrapper}>
        {props.hjelpetekst && (
          <HelpText className={styles.hjelpetekst_innhold}>
              {props.hjelpetekst}
          </HelpText>
        )}
          {props.readMore && (
          <ReadMore  header={'?'} className={styles.hjelpetekst_innhold}>
              {props.readMore}
          </ReadMore>
        )}
      </div>
    </div>
  );
};
