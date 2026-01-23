export const useApiPath = (v2Path: string, legacyPath: string): string => {
  let erLegacy = false;
  if (typeof window !== "undefined") {
    erLegacy = localStorage.getItem("erLegacy") === "true";
  }

  return erLegacy ? legacyPath : v2Path;
};
