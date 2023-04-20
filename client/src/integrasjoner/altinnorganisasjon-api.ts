import { RestRessurs } from "./rest-status";

export type RestAltinnOrganisasjoner = RestRessurs<AltinnOrganisasjon[]>;

export interface AltinnOrganisasjon {
  Name: string;
  Type: string;
  OrganizationNumber: string;
  OrganizationForm: string;
  Status: string;
  ParentOrganizationNumber: string;
}
