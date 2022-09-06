import {PageProps} from "../pageProps";
import {
  ferdigNedlastet, ikkeFerdigLastet,
  RestStatus
} from "../integrasjoner/rest-status";
import {
  Fraværskalkulator
} from "../komponenter/Kalkulator/Kalkulator/Fraværskalkulator";
import {useAggregertStatistikk} from "../hooks/useAggregertStatistikk";
import {useAltinnOrganisasjoner} from "../hooks/useAltinnOrganisasjoner";
import {hentUtKalkulatorData} from "../komponenter/Kalkulator/datauthenting";
import {Innloggingsside} from "../Innlogginsside/Innloggingsside";
import {tomtDataobjekt} from "../integrasjoner/aggregert-statistikk-api";

export function Kalkulator(props: { page: PageProps }) {

  //Hent ned data
  const organisasjonerBrukerHarTilgangTil = useAltinnOrganisasjoner();

  const statistikk = useAggregertStatistikk()
  const statistikkData = ferdigNedlastet(statistikk)
      ? statistikk.data : tomtDataobjekt;



  const innhold = (
      <>
        {statistikk.status === RestStatus.IkkeInnlogget ? (
            <Innloggingsside redirectUrl={window.location.href}/>
        ) : (
            <Fraværskalkulator
                {...hentUtKalkulatorData(statistikkData)}
                 nedlastingPågår = {ikkeFerdigLastet(statistikk)}/>
          )


          </>

          )

          return (
          <Layout
          title={props.page.title}
          description={props.page.description}
          altinnOrganisasjoner={
          organisasjonerBrukerHarTilgangTil.status === RestStatus.Suksess
          ? organisasjonerBrukerHarTilgangTil.data
          : []
        }>
          <Fraværskalkulator
          </Layout>
          )
        }

        // NextJS kaller denne ved Client Side Rendering
        export async function getStaticProps() {
        // Hvordan få tak i orgnr her? Vil kalle API server side
        const page = {
        title: "Fraværskalkulator",
        description:
        "Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.",
      };

        return {props: {page}};
      }
