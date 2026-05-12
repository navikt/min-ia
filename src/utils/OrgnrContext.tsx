"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const STORAGE_KEY = "virksomhetsvelger_bedrift";

export const OrgnrContext = React.createContext<{
  orgnr: string | null;
  setOrgnr: (orgNr: string | null) => void;
} | null>(null);

export const OrgnrProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [valgtOrgnr, setValgtOrgnrState] = React.useState<string | null>(null);
  const [orgnrFraLocalStorage] = React.useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  });

  const [orgnrFraUrlCapture, setOrgnrFraUrlCapture] = React.useState<
    string | null
  >(() => searchParams.get("bedrift"));

  const setOrgnr = React.useCallback((orgNr: string | null) => {
    setOrgnrFraUrlCapture(null);
    setValgtOrgnrState(orgNr);

    if (typeof window === "undefined") {
      return;
    }

    if (orgNr) {
      window.localStorage.setItem(STORAGE_KEY, orgNr);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  React.useEffect(() => {
    if (typeof router.query.bedrift !== "string") {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("bedrift");

    router.replace(
      router.pathname,
      nextSearchParams.size > 0 ? `?${nextSearchParams.toString()}` : undefined,
      { shallow: true, scroll: false },
    );
  }, [router, router.query.bedrift, searchParams]);

  // Set orgnr i den rekkefølgen: 1) valgtOrgnr, 2) orgnr fra URL, 3) orgnr fra localStorage
  const orgnr = valgtOrgnr ?? orgnrFraUrlCapture ?? orgnrFraLocalStorage;

  return (
    <OrgnrContext.Provider value={{ orgnr, setOrgnr }}>
      {children}
    </OrgnrContext.Provider>
  );
}

export const useOrgnrContext = () => {
  const context = React.useContext(OrgnrContext);
  if (!context) {
    throw new Error("useOrgNr must be used within an OrgNrProvider");
  }
  return context;
};
