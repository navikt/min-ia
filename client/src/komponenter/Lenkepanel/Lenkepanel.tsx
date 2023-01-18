import { LinkPanel } from "@navikt/ds-react";
import {navigerEtterCallbacks} from "../../utils/navigasjon";
import {sendNavigereEvent} from "../../amplitude/events";

export interface LenkepanelProps {
  tittel: string;
  tekst?: string;
  href:string;
  ikon?: any;
  className?:string;
}

export const Lenkepanel = ({ tittel, tekst,href, ikon,className }: LenkepanelProps) => {
  return (
    <>
      <LinkPanel
        href={href}
        className={className}
        onClickCapture={(e) => {
          e.preventDefault();
        }}
        onClick={() => {
          navigerEtterCallbacks(href, [
            () => sendNavigereEvent(href, tittel),
          ]);
        }}
      >
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gap: "var(--a-spacing-8)",
            alignItems: "center",
          }}
        >
          {ikon}
          <div>
            <LinkPanel.Title>{tittel}</LinkPanel.Title>
            <LinkPanel.Description>{tekst}</LinkPanel.Description>
          </div>
        </div>
      </LinkPanel>
    </>
  );
};
