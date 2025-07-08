import React from "react";

export type SamarbeidStatus = "AKTIV" | "FULLFØRT" | "SLETTET" | "AVBRUTT";

export type Samarbeid = {
	id: string;
	navn: string;
	status: SamarbeidStatus;
};
const dummySamarbeid: Samarbeid[] = [
	{ id: "1", navn: "Avdeling Oslo", status: "AKTIV" },
	{ id: "2", navn: "Avdeling Gjøvik", status: "AKTIV" },
	{ id: "3", navn: "Avdeling Bodø", status: "AKTIV" },
	{ id: "4", navn: "Avdeling Arendal", status: "AKTIV" },
	{ id: "5", navn: "Avdeling Bergen", status: "AKTIV" },
	{ id: "6", navn: "Avdeling Trondheim", status: "AKTIV" },
	{ id: "7", navn: "Avdeling Tromsø", status: "AKTIV" },
	{ id: "8", navn: "Avdeling Stavanger", status: "AKTIV" },
	{ id: "9", navn: "Avdeling Kristiansand", status: "AKTIV" },
	{ id: "10", navn: "Avdeling Drammen", status: "FULLFØRT" },
	{ id: "11", navn: "Avdeling Lillehammer", status: "SLETTET" },
	{ id: "12", navn: "Avdeling Haugesund", status: "AVBRUTT" },
];

export const SamarbeidsvelgerContext = React.createContext<{
	tilgjengeligeSamarbeid: Samarbeid[];
	valgtSamarbeid: string;
	setValgtSamarbeid: (samarbeidId: string) => void;
}>({
	tilgjengeligeSamarbeid: [],
	valgtSamarbeid: "",
	setValgtSamarbeid: () => { },
});


export const SamarbeidsvelgerProvider = ({ children }: { children: React.ReactNode }) => {
	const samarbeid = dummySamarbeid;
	const [valgtSamarbeid, setValgtSamarbeid] = React.useState<string>(samarbeid[0].id || "");

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