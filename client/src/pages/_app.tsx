import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

function MyApp({ Component, pageProps }: AppProps) {
  const history = createMemoryHistory();

  return (
    <Router history={history}>
      <Component {...pageProps} />
    </Router>
  );
}

export default MyApp;
