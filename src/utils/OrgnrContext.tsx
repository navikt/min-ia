'use client';
import React from "react";

export const OrgnrContext = React.createContext<{
	orgnr: string | null;
	setOrgnr: (orgNr: string | null) => void;
} | null>(null);

export const OrgnrProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [orgnr, setOrgnr] = React.useState<string | null>(null);
	return (
		<OrgnrContext.Provider value={{ orgnr, setOrgnr }}>
			{children}
		</OrgnrContext.Provider>
	);
};

export const useOrgnrContext = () => {
	const context = React.useContext(OrgnrContext);
	if (!context) {
		throw new Error("useOrgNr must be used within an OrgNrProvider");
	}
	return context;
};