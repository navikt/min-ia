import { LinkPanel } from "@navikt/ds-react";

interface Props {
  tittel: string;
  tekst?: string;
  ikon?: any;
}

export const Lenkepanel = ({ tittel, tekst, ikon }: Props) => {
  return (
    <>

      <LinkPanel href="#">
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gap: "var(--navds-spacing-8)",
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
