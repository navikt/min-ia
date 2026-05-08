"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

export const OrgnrContext = React.createContext<{
  orgnr: string | null;
  setOrgnr: (orgNr: string | null) => void;
} | null>(null);

export const OrgnrProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // brukervalgt orgnr (hook som Virksomhetsvelgeren setter når brukeren velger en bedrift)
  const [valgtOrgnr, setValgtOrgnr] = React.useState<string | null>(null);
  // Orgnr hentet fra URL
  const orgnrFraUrl = searchParams.get("bedrift");
  // Bruk Orgnr som er valgt av brukeren i virksomhetsvelgeren, eller fallback til orgnr i URL hvis det finnes
  const orgnr = valgtOrgnr ?? orgnrFraUrl;

  React.useEffect(() => {
    if (typeof router.query.bedrift === "string") {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("bedrift");

      router.replace(
        router.pathname,
        nextSearchParams.size > 0
          ? `?${nextSearchParams.toString()}`
          : undefined,
        { shallow: true, scroll: false },
      );
    }
  }, [router, router.query.bedrift, searchParams]);

  return (
    <OrgnrContext.Provider value={{ orgnr, setOrgnr: setValgtOrgnr }}>
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
