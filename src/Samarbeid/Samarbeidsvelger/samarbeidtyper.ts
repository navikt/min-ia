export type SamarbeidStatus =
  | "AKTIV"
  | "NY"
  | "IKKE_AKTIV"
  | "VURDERES"
  | "KONTAKTES"
  | "KARTLEGGES"
  | "VI_BISTÅR"
  | "IKKE_AKTUELL"
  | "FULLFØRT"
  | "SLETTET"
  | "AVBRUTT"
  | "VURDERT"
  | "AVSLUTTET";

type SamarbeidhendelseBase = {
  dato: Date;
};
export type SarbeidsplanHendelse = SamarbeidhendelseBase & {
  type: "SAMARBEIDSPLAN";
  start: Date;
  slutt: Date;
};

export type SpørreundersøkelseHendelse = SamarbeidhendelseBase & {
  type: "BEHOVSVURDERING" | "EVALUERING";
  gjennomført: Date;
};

export type SamarbeidOpprettetHendelse = SamarbeidhendelseBase & {
  type: "SAMARBEID_STATUSENDRING";
  nyStatus: SamarbeidStatus;
  dato: Date;
};

export type Samarbeidhendelse =
  | SarbeidsplanHendelse
  | SpørreundersøkelseHendelse
  | SamarbeidOpprettetHendelse;
