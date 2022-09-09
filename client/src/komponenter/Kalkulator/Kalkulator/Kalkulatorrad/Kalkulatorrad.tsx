import React, { FunctionComponent, ReactElement } from "react";
import "./Kalkulatorrad.scss";
import classNames from "classnames";
import { useOrgnr } from "../../../../hooks/useOrgnr";
import { sendInputfeltUtfyltEvent } from "../../../../amplitude/events";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../../../../integrasjoner/ia-tjenestemetrikker-api";
import { BodyLong, HelpText, Label, Loader, TextField } from "@navikt/ds-react";

interface Props {
  onChange: (event: any) => void;
  value: number | undefined;
  label: string;
  name: string;
  hjelpetekst?: string | ReactElement;
  placeholder?: string;
  visSpinner?: boolean;
  step?: number;
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
    <div className="kalkulatorrad">
      <Label id={labelId}>{props.label}</Label>
      <div
        className={
          props.hjelpetekst
            ? "kalkulatorrad__input-hjelpetekst-wrapper"
            : classNames(
                "kalkulatorrad__input-hjelpetekst-wrapper",
                "kalkulatorrad__input-no-hjelpetekst-wrapper"
              )
        }
      >
        <TextField
          label=""
          onChange={onChangeEventHandler}
          value={props.value?.toString() || ""}
          type="number"
          className="kalkulatorrad__input"
          placeholder={props.placeholder || "0"}
          step={props.step}
          aria-labelledby={labelId}
        />
        {props.visSpinner && (
          <Loader className="kalkulatorrad__spinner" transparent={true} />
        )}
        <div className={"kalkulatorrad__hjelpetekst_wrapper"}>
          {props.hjelpetekst && (
            <HelpText className="kalkulatorrad__hjelpetekst">
              <BodyLong className="kalkulatorrad__hjelpetekst-innhold">
                {props.hjelpetekst}
              </BodyLong>
            </HelpText>
          )}
        </div>
      </div>
    </div>
  );
};
