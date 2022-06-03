import { Link } from "@navikt/ds-react";
import React from "react";
import { sendNavigereEvent } from "../amplitude/events";

export const LenkeMedEvent: React.FunctionComponent<{
  href: string;
  lenketekst: string;
  className?: any;
}> = ({ href, lenketekst, className }) => {
  return (
    <Link
      href={href}
      onClick={() => {
        sendNavigereEvent(href, lenketekst);
      }}
      className={className}
    >
      {lenketekst}
    </Link>
  );
};
