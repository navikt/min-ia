import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  injectDecoratorClientSide,
  setBreadcrumbs,
  setParams,
} from "@navikt/nav-dekoratoren-moduler";
import {BrowserRouter} from "react-router-dom";

const init = async () => {
  await injectDecoratorClientSide({
    env: import.meta.env.prod ? "prod" : "dev",
  });

  await setBreadcrumbs([
    {
      title: "Min side arbeidsgiver",
      url: "https://arbeidsgiver.nav.no/min-side-arbeidsgiver",
    },
    {
      title: "Forebygge sykefravær ",
      url: "https://arbeidsgiver.nav.no/min-ia/",
    },
  ]);

  await setParams({
    context: "arbeidsgiver",
    simple: false,
    chatbot: false,
  });

  ReactDOM.render(
    <BrowserRouter basename={'/min-ia'}>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

init();
