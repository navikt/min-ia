import { Tag, TagProps } from "@navikt/ds-react";
import { SamarbeidStatus } from "./Samarbeidsvelger/samarbeidtyper";

export function SamarbeidsStatusBadge({ status }: { status: SamarbeidStatus }) {
  return (
    <Tag {...hentVariantForIAStatus(status)} size="small">
      {penskrivIAStatus(status)}
    </Tag>
  );
}

export function penskrivIAStatus(status: SamarbeidStatus) {
  switch (status) {
    case "NY":
      return "Opprettet";
    case "VURDERES":
      return "Vurderes";
    case "IKKE_AKTIV":
    case "SLETTET":
      return "Ikke aktiv";
    case "KONTAKTES":
      return "Kontaktes";
    case "IKKE_AKTUELL":
      return "Ikke aktuell";
    case "KARTLEGGES":
      return "Kartlegges";
    case "VI_BISTÅR":
      return "Vi bistår";
    case "FULLFØRT":
      return "Fullført";
    case "AKTIV":
      return "Aktiv";
    case "VURDERT":
      return "Vurdert";
    case "AVSLUTTET":
      return "Avsluttet";
    case "AVBRUTT":
      return "Avbrutt";
    default:
      return status;
  }
}

function hentVariantForIAStatus(status: SamarbeidStatus): Partial<TagProps> {
  switch (status) {
    case "NY":
    case "FULLFØRT":
      return { variant: "outline", "data-color": "success" };
    case "IKKE_AKTIV":
    case "SLETTET":
    case "AVBRUTT":
      return { variant: "outline", "data-color": "neutral" };
    case "AKTIV":
      return { variant: "outline", "data-color": "brand-blue" };
    // ikke eksisterende
    case "AVSLUTTET":
      return { variant: "strong", "data-color": "neutral" };
    case "VURDERES":
      return { variant: "moderate", "data-color": "meta-lime" };
    case "KONTAKTES":
      return { variant: "strong", "data-color": "brand-blue" };
    case "KARTLEGGES":
      return { variant: "moderate", "data-color": "warning" };
    case "VI_BISTÅR":
      return { variant: "strong", "data-color": "success" };
    case "VURDERT":
      return { variant: "strong", "data-color": "meta-lime" };
    case "IKKE_AKTUELL":
      return { variant: "strong", "data-color": "danger" };
  }

  return {};
}
