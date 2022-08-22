import {PageProps} from "../pageProps";

export default function Kalkulator(props: { page: PageProps }) {

}

// NextJS kaller denne ved Server Side Rendering (SSR)
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const page = {
    title: "Kalkulator",
    description:
        "Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.",
  };

  return { props: { page } };
};
