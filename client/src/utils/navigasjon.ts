// Sender brukeren til navigering først etter at callbacks har blitt utført. Hvis kallene
// tar lengre tid enn maksVentetid millisekunder, så tvinges navigeringen gjennom.
// NB: For at dette skal fungere så kreves det en onClickCapture med preventDefault() på lenka
export const navigerEtterCallbacks = async (
  destinasjon: string,
  callbacks: (() => Promise<boolean>)[],
  maksVentetid: number = 1000
) => {
  setTimeout(() => {
    window.location.href = destinasjon;
  }, maksVentetid);

  const results = callbacks.map((fun) => fun());

  await Promise.allSettled(results).then(
    () => {
      window.location.href = destinasjon}
  );
};

export function leggTilBedriftPåUrl(url: string, orgnr: string | null) {
  return orgnr ? `${url}?bedrift=${orgnr}` : url;
}
