import { useWindowSize } from "../hooks/useWindowSize";
import { SCREEN_MOBILE_MIN } from "../utils/konstanter";
import { LinkPanel } from "@navikt/ds-react";
import React from "react";

export function PanelBrødtekstSkjultPåMobil(props: { tekst: string }) {
  const windowSize = useWindowSize();

  if (windowSize.width === undefined || windowSize.width < SCREEN_MOBILE_MIN) {
    return null;
  }

  return <LinkPanel.Description>{props.tekst}</LinkPanel.Description>;
}
