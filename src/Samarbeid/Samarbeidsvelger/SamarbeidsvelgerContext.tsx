import React from "react";
import { Samarbeid } from "./samarbeidtyper";
import { RestStatus } from "../../integrasjoner/rest-status";
import { useFiaSamarbeid } from "../fiaSamarbeidAPI";
import { sendSamarbeidValgtEvent } from "../../utils/analytics/analytics";

export const SamarbeidsvelgerContext = React.createContext<{
	tilgjengeligeSamarbeid: Samarbeid[];
	valgtSamarbeid?: string;
	setValgtSamarbeid: (samarbeidId: string) => void;
}>({
	tilgjengeligeSamarbeid: [],
	valgtSamarbeid: undefined,
	setValgtSamarbeid: () => { },
});


export const SamarbeidsvelgerProvider = ({ children, samarbeidId, setSamarbeidId }: { children: React.ReactNode, samarbeidId?: string, setSamarbeidId: (id: string) => void }) => {
	const samarbeidsliste = useFiaSamarbeid();

	const setSamarbeidOgSendMetrikker = (id: string) => {
		setSamarbeidId(id);

		if (samarbeidsliste.status === RestStatus.Suksess && samarbeidsliste.data) {
			const valgtSamarbeid = samarbeidsliste.data?.find(s => s.id === id);

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
			id: `${samarbeid.id}`,
			saksnummer: samarbeid.saksnummer,
			navn: samarbeid.navn,
			status: samarbeid.status,
			opprettet: new Date(samarbeid.opprettet),
			sistEndret: new Date(samarbeid.sistEndret),
			hendelser: [] // Placeholder for hendelser, kan utvides senere
		})) || [];
	}, [samarbeidsliste]);

	React.useEffect(() => {
		if (samarbeid.length > 0 && !samarbeidId) {
			setSamarbeidId(samarbeid[0].id);
		}
	}, [samarbeid, samarbeidId, setSamarbeidId]);

	return (
		<SamarbeidsvelgerContext.Provider value={{ tilgjengeligeSamarbeid: samarbeid, valgtSamarbeid: samarbeidId, setValgtSamarbeid: setSamarbeidOgSendMetrikker }}>
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

export function useDokumenterPåSamarbeid(samarbeidId: string | undefined) {
	const samarbeidsliste = useFiaSamarbeid();

	return React.useMemo(() => {
		if (samarbeidsliste.status !== RestStatus.Suksess || !samarbeidsliste.data || !samarbeidId) {
			return [];
		}
		const valgtSamarbeid = samarbeidsliste.data.find(s => Number(s.id) === Number(samarbeidId));
		return valgtSamarbeid ? valgtSamarbeid.dokumenter : [];
	}, [samarbeidsliste, samarbeidId]);
}

export function useDokumenterPåValgtSamarbeid() {
	const { valgtSamarbeid } = useSamarbeidsvelgerContext();
	return useDokumenterPåSamarbeid(valgtSamarbeid);
}