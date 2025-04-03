export const usePath = (v2Path: string, defaultPath: string): string => {
    let erV2 = false;
    if (typeof window !== 'undefined') {
        erV2 = localStorage.getItem("erV2") === "true";
        console.log(`[DEBUG] erV2: ${erV2}`);
    }

    return erV2 ? v2Path : defaultPath;
};
