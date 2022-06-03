import { Link } from "@navikt/ds-react";
import React from "react";
import { navigerEtterCallbacks } from "../utils/navigasjon";
import { sendNavigereEvent } from "../amplitude/events";

export const LenkeMedEventutsendelse: React.FunctionComponent<{
  href: string;
  lenketekst: string;
  className?: any;
}> = ({ href, lenketekst, className }) => {
  const amplitudeutsendelse = () => {
    return sendNavigereEvent(href, lenketekst);
  };
  return (
    <Link
      href={href}
      onClickCapture={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        navigerEtterCallbacks(href, [amplitudeutsendelse]);
      }}
      className={className}
    >
      {lenketekst}
    </Link>
  );
};
