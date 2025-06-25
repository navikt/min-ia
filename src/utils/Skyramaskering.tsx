'use client';
import React from 'react';

declare global {
	interface Window {
		skyra?: {
			redactSearchParam: (param: string, options: { path: string }) => void;
		};
	}
}

const MAX_RETRY_ATTEMPTS = 10;

export default function Skyramaskering() {
	const [retryCount, setRetryCount] = React.useState(0);
	// Vi trenger å kjøre redactSearchParam for å fjerne bedrift fra URL-en om bruker svarer på Skyra-undersøkelsen.
	React.useEffect(() => {
		if (retryCount < MAX_RETRY_ATTEMPTS) {
			console.log("Prøver maskering, retrtyCount:", retryCount);
			if (window !== undefined && window?.skyra?.redactSearchParam) {
				window?.skyra?.redactSearchParam("bedrift", { path: "/forebygge-fravar" });
				console.log("Skyramaskering: redactSearchParam called successfully.");
			} else {
				setTimeout(() => {
					console.warn("Skyramaskering: window is not defined, retrying...");
					setRetryCount((prevCount) => prevCount + 1);
				}, 1000); // Retry after 1 second
			}
		} else {
			console.error("Skyramaskering: Maximum retry attempts reached. Could not call redactSearchParam.");
		}
	});

	return null;
}
