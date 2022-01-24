import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler'

const init = async () => {
    console.log(import.meta.env)
    console.log(import.meta.env.NODE_ENV)
    if (import.meta.env.dev) {
        await injectDecoratorClientSide({
            env: "localhost",
            port: 8088,
            breadcrumbs: [
                {
                    title: "Korona - hva gjelder i min situasjon?",
                    url: "https://www.nav.no/person/koronaveiviser/"
                }
            ]
        });
    }

    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    )
};
init()