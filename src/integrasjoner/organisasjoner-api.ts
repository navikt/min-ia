export interface Organisasjon {
  orgnr: string;
  altinn3Tilganger: string[];
  altinn2Tilganger: string[];
  underenheter: Organisasjon[];
  navn: string;
  organisasjonsform: string;
  erSlettet: string;
}
