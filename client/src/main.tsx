import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler'

const init = async () => {
    await injectDecoratorClientSide({
        env: "dev", // TODO: hent miljø variabel dev eller prod
        //port: 8080,
        breadcrumbs: [
            {
                title: "Korona - hva gjelder i min situasjon?",
                url: "https://www.nav.no/person/koronaveiviser/"
            }
        ]
    });

    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    )
};
init()
