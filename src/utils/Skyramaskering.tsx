'use client';
import React from 'react';

declare global {
	interface Window {
		skyra?: {
			redactSearchParam: (param: string, options: { path: string }) => void;
		};
	}
}

export default function Skyramaskering() {
	// Vi trenger å kjøre redactSearchParam for å fjerne bedrift fra URL-en om bruker svarer på Skyra-undersøkelsen.
	React.useEffect(() => {
		window?.skyra?.redactSearchParam("bedrift", { path: "/forebygge-fravar" });
	});

	return null;
}
