import React from "react";
import { Samarbeid } from "./samarbeidtyper";
import { RestStatus } from "../../integrasjoner/rest-status";
import { useFiaSamarbeid } from "../fiaSamarbeidAPI";
import { sendSamarbeidValgtEvent } from "../../utils/analytics/analytics";

export const SamarbeidsvelgerContext = React.createContext<{
	tilgjengeligeSamarbeid: Samarbeid[];
	valgtSamarbeid?: string;
    setValgtSamarbeid: (samarbeidOffentligId: string) => void;
}>({
	tilgjengeligeSamarbeid: [],
	valgtSamarbeid: undefined,
	setValgtSamarbeid: () => { },
});


export const SamarbeidsvelgerProvider = ({children, samarbeidOffentligId, setSamarbeidOffentligId}: {
    children: React.ReactNode,
    samarbeidOffentligId?: string,
    setSamarbeidOffentligId: (offentligId: string) => void
}) => {
	const samarbeidsliste = useFiaSamarbeid();

    const setSamarbeidOgSendMetrikker = (offentligId: string) => {
        setSamarbeidOffentligId(offentligId);

		if (samarbeidsliste.status === RestStatus.Suksess && samarbeidsliste.data) {
            const valgtSamarbeid = samarbeidsliste.data?.find(s => s.offentligId === offentligId);

			if (valgtSamarbeid) {
				sendSamarbeidValgtEvent(valgtSamarbeid.status);
			} else {
				sendSamarbeidValgtEvent("Ukjent");
			}
		}

	};

	const samarbeid: Samarbeid[] = React.useMemo(() => {
		if (samarbeidsliste.status !== RestStatus.Suksess || !samarbeidsliste.data) {
			return [];
		}
		return samarbeidsliste?.data?.map((samarbeid) => ({
            offentligId: samarbeid.offentligId,
			saksnummer: samarbeid.saksnummer,
			navn: samarbeid.navn,
			status: samarbeid.status,
			opprettet: new Date(samarbeid.opprettet),
			sistEndret: new Date(samarbeid.sistEndret),
			hendelser: [] // Placeholder for hendelser, kan utvides senere
		})) || [];
	}, [samarbeidsliste]);

	React.useEffect(() => {
        if (samarbeid.length > 0 && !samarbeidOffentligId) {
            setSamarbeidOffentligId(samarbeid[0].offentligId);
		}
    }, [samarbeid, samarbeidOffentligId, setSamarbeidOffentligId]);

	return (
        <SamarbeidsvelgerContext.Provider value={{
            tilgjengeligeSamarbeid: samarbeid,
            valgtSamarbeid: samarbeidOffentligId,
            setValgtSamarbeid: setSamarbeidOgSendMetrikker
        }}>
			{children}
		</SamarbeidsvelgerContext.Provider>
	);
};

export const useSamarbeidsvelgerContext = () => {
	const context = React.useContext(SamarbeidsvelgerContext);
	if (!context) {
		throw new Error("useSamarbeidsvelger must be used within a SamarbeidsvelgerProvider");
	}
	return context;
};

export function useDokumenterPåSamarbeid(samarbeidOffentligId: string | undefined) {
	const samarbeidsliste = useFiaSamarbeid();

	return React.useMemo(() => {
        if (samarbeidsliste.status !== RestStatus.Suksess || !samarbeidsliste.data || !samarbeidOffentligId) {
			return [];
		}
        const valgtSamarbeid = samarbeidsliste.data.find(s => s.offentligId === samarbeidOffentligId);
		return valgtSamarbeid ? valgtSamarbeid.dokumenter : [];
    }, [samarbeidsliste, samarbeidOffentligId]);
}

export function useDokumenterPåValgtSamarbeid() {
	const { valgtSamarbeid } = useSamarbeidsvelgerContext();
	return useDokumenterPåSamarbeid(valgtSamarbeid);
}