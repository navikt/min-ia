export enum RestStatus {
  IkkeLastet = "IkkeLastet",
  LasterInn = "LasterInn",
  Suksess = "Suksess",
  IkkeInnlogget = "IkkeInnlogget",
  IngenTilgang = "IngenTilgang",
  Feil = "Feil",
}

export interface IkkeLastet {
  status: RestStatus.IkkeLastet;
}

export interface LasterInn {
  status: RestStatus.LasterInn;
}

export interface IkkeInnlogget {
  status: RestStatus.IkkeInnlogget;
}

export interface IngenTilgang {
  status: RestStatus.IngenTilgang;
}

export interface Feil {
  status: RestStatus.Feil;
}

export interface Suksess<T> {
  status: RestStatus.Suksess;
  data: T;
}

export type RestRessurs<T> =
  | IkkeLastet
  | LasterInn
  | Suksess<T>
  | IkkeInnlogget
  | Feil
  | IngenTilgang;

export function erSuksess<T>(ressurs: RestRessurs<T>): ressurs is Suksess<T> {
  return ressurs.status === RestStatus.Suksess;
}

export const erIkkeInnlogget = <T>(
  respons: RestRessurs<T>
): respons is IkkeInnlogget => {
  return respons.status === RestStatus.IkkeInnlogget;
};

export const erIkkeFerdigLastet = <T>(
  respons: RestRessurs<T>
): respons is IkkeLastet => {
  return respons.status === RestStatus.IkkeLastet;
};

export const erFerdigNedlastet = <T>(
  respons: RestRessurs<T>
): respons is Suksess<T> => {
  return respons.status === RestStatus.Suksess;
};

export const mapStatusskodeTilRestStatus = (statuskode: number): RestStatus => {
  switch (statuskode) {
    case 200: {
      return RestStatus.Suksess;
    }
    case 401: {
      return RestStatus.IkkeInnlogget;
    }
    case 403: {
      return RestStatus.IngenTilgang;
    }
    default: {
      return RestStatus.Feil;
    }
  }
};
