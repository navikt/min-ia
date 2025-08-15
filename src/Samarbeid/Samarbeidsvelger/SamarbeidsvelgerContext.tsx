import React from "react";
import { Samarbeid } from "./samarbeidtyper";
import { RestStatus } from "../../integrasjoner/rest-status";
import { useFiaSamarbeid } from "../fiaSamarbeidAPI";

export const SamarbeidsvelgerContext = React.createContext<{
	tilgjengeligeSamarbeid: Samarbeid[];
	valgtSamarbeid?: string;
	setValgtSamarbeid: (samarbeidId: string) => void;
}>({
	tilgjengeligeSamarbeid: [],
	valgtSamarbeid: undefined,
	setValgtSamarbeid: () => { },
});


export const SamarbeidsvelgerProvider = ({ children }: { children: React.ReactNode }) => {
	const samarbeidsliste = useFiaSamarbeid();

	const samarbeid: Samarbeid[] = React.useMemo(() => {
		if (samarbeidsliste.status !== RestStatus.Suksess || !samarbeidsliste.data) {
			return [];
		}
		return samarbeidsliste?.data?.map((samarbeid) => ({
			id: samarbeid.id,
			saksnummer: samarbeid.saksnummer,
			navn: samarbeid.navn,
			status: samarbeid.status,
			opprettet: new Date(samarbeid.opprettet),
			sistEndret: new Date(samarbeid.sistEndret),
			hendelser: [] // Placeholder for hendelser, kan utvides senere
		})) || [];
	}, [samarbeidsliste]);

	const [valgtSamarbeid, setValgtSamarbeid] = React.useState<string | undefined>(samarbeid[0]?.id);

	React.useEffect(() => {
		if (samarbeid.length > 0 && !valgtSamarbeid) {
			setValgtSamarbeid(samarbeid[0].id);
		}
	}, [samarbeid, valgtSamarbeid]);

	return (
		<SamarbeidsvelgerContext.Provider value={{ tilgjengeligeSamarbeid: samarbeid, valgtSamarbeid, setValgtSamarbeid }}>
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