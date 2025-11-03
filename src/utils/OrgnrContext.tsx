'use client';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
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
	const router = useRouter();
	const searchParams = useSearchParams();
	const [orgnr, setOrgnr] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (typeof router.query.bedrift === 'string') {
			const nextSearchParams = new URLSearchParams(searchParams.toString());

			if (nextSearchParams.size > 1) {
				nextSearchParams.delete('bedrift');
				setOrgnr(router.query.bedrift);
				router.replace(router.pathname, `?${nextSearchParams.toString()}`, { shallow: true, scroll: false });
			} else {
				setOrgnr(router.query.bedrift);
				router.replace(router.pathname, undefined, { shallow: true, scroll: false });
			}
		}
	}, [router.query.bedrift, router, searchParams]);

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