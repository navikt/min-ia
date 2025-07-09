import React from "react";
import { dummySamarbeid } from "./dummySamarbeid";
import { Samarbeid } from "./samarbeidtyper";

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