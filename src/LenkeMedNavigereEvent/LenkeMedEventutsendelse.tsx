import { Link } from "@navikt/ds-react";
import React from "react";

import {sendNavigereEvent} from "../amplitude/amplitude";

export const LenkeMedEventutsendelse: React.FunctionComponent<{
  href: string;
  lenketekst: string;
  className?: string;
}> = ({ href, lenketekst, className }) => {
  return (
    <Link
      href={href}
      onClick={() => {sendNavigereEvent(href, lenketekst)}}
      className={className}
    >
      {lenketekst}
    </Link>
  );
};
