export const fiaArbeidsgiverMock = (orgnr: string) => {
    return {
        orgnr: orgnr,
        samarbeid: orgnr.startsWith("9") ? "IKKE_I_SAMARBEID" : "I_SAMARBEID"
    }
}