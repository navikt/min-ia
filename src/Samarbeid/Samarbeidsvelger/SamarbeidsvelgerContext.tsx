import React from "react";
import { RestStatus } from "../../integrasjoner/rest-status";
import { FiaSamarbeidDto, useFiaSamarbeid } from "../fiaSamarbeidAPI";
import { sendSamarbeidValgtEvent } from "../../utils/analytics/analytics";

export const SamarbeidsvelgerContext = React.createContext<{
  tilgjengeligeSamarbeid: FiaSamarbeidDto[];
  valgtSamarbeid?: string;
  setValgtSamarbeid: (samarbeidOffentligId: string) => void;
  status?: RestStatus;
}>({
  tilgjengeligeSamarbeid: [],
  valgtSamarbeid: undefined,
  setValgtSamarbeid: () => {},
  status: RestStatus.IkkeLastet,
});

export const SamarbeidsvelgerProvider = ({
  children,
  samarbeidOffentligId,
  setSamarbeidOffentligId,
}: {
  children: React.ReactNode;
  samarbeidOffentligId?: string;
  setSamarbeidOffentligId: (offentligId: string) => void;
}) => {
  const samarbeidsliste = useFiaSamarbeid();

  const setSamarbeidOgSendMetrikker = (offentligId: string) => {
    setSamarbeidOffentligId(offentligId);

    if (samarbeidsliste.status === RestStatus.Suksess && samarbeidsliste.data) {
      const valgtSamarbeid = samarbeidsliste.data?.find(
        (s) => s.offentligId === offentligId,
      );

      if (valgtSamarbeid) {
        sendSamarbeidValgtEvent(valgtSamarbeid.status);
      } else {
        sendSamarbeidValgtEvent("Ukjent");
      }
    }
  };

  const samarbeid = React.useMemo(() => {
    if (
      samarbeidsliste.status !== RestStatus.Suksess ||
      !samarbeidsliste.data
    ) {
      return [];
    }
    return samarbeidsliste?.data || [];
  }, [samarbeidsliste]);

  React.useEffect(() => {
    if (samarbeid.length > 0 && !samarbeidOffentligId) {
      setSamarbeidOffentligId(samarbeid[0].offentligId);
    }
  }, [samarbeid, samarbeidOffentligId, setSamarbeidOffentligId]);

  return (
    <SamarbeidsvelgerContext.Provider
      value={{
        tilgjengeligeSamarbeid: samarbeid,
        valgtSamarbeid: samarbeidOffentligId,
        setValgtSamarbeid: setSamarbeidOgSendMetrikker,
        status: samarbeidsliste.status,
      }}
    >
      {children}
    </SamarbeidsvelgerContext.Provider>
  );
};

export const useSamarbeidsvelgerContext = () => {
  const context = React.useContext(SamarbeidsvelgerContext);
  if (!context) {
    throw new Error(
      "useSamarbeidsvelger must be used within a SamarbeidsvelgerProvider",
    );
  }
  return context;
};

export function useDokumenterPåSamarbeid(
  samarbeidOffentligId: string | undefined,
) {
  const samarbeidsliste = useFiaSamarbeid();

  return React.useMemo(() => {
    if (
      samarbeidsliste.status !== RestStatus.Suksess ||
      !samarbeidsliste.data ||
      !samarbeidOffentligId
    ) {
      return [];
    }
    const valgtSamarbeid = samarbeidsliste.data.find(
      (s) => s.offentligId === samarbeidOffentligId,
    );
    return valgtSamarbeid ? valgtSamarbeid.dokumenter : [];
  }, [samarbeidsliste, samarbeidOffentligId]);
}

export function useSamarbeidLastestatus() {
  const { status } = useSamarbeidsvelgerContext();
  return status;
}

export function useDokumenterPåValgtSamarbeid() {
  const { valgtSamarbeid } = useSamarbeidsvelgerContext();
  return useDokumenterPåSamarbeid(valgtSamarbeid);
}
