import React from "react";

export type Samarbeid = {
	id: string;
	navn: string;
};
const dummySamarbeid: Samarbeid[] = [
	{ id: "1", navn: "Avdeling Oslo" },
	{ id: "2", navn: "Avdeling Gjøvik" },
	{ id: "3", navn: "Avdeling Bodø" },
	{ id: "4", navn: "Avdeling Arendal" },
	{ id: "5", navn: "Avdeling Bergen" },
	{ id: "6", navn: "Avdeling Trondheim" },
	{ id: "7", navn: "Avdeling Tromsø" },
	{ id: "8", navn: "Avdeling Stavanger" },
	{ id: "9", navn: "Avdeling Kristiansand" },
	{ id: "10", navn: "Avdeling Drammen" },
	{ id: "11", navn: "Avdeling Lillehammer" },
	{ id: "12", navn: "Avdeling Haugesund" },
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