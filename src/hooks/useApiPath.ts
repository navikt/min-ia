export const useApiPath = (v2Path: string, defaultPath: string): string => {
    let erV2 = false;
    if (typeof window !== 'undefined') {
        erV2 = localStorage.getItem("erV2") === "true";
    }

    return erV2 ? v2Path : defaultPath;
};
