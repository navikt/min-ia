import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {injectDecoratorClientSide, setBreadcrumbs} from '@navikt/nav-dekoratoren-moduler'


const init = async () => {
    await injectDecoratorClientSide({
        env: import.meta.env.prod ? "prod" : "dev", // TODO: dobbelt teste i produksjon
    });

    setBreadcrumbs([{
        title: "min side arbeidsgiver",
        url: "https://arbeidsgiver.nav.no/min-side-arbeidsgiver",
    },
        {
            title: "Forebygge sykefravær ", // TODO sjek tekst med Monica
            url: "https://arbeidsgiver.nav.no/min-ia/"
        }
    ]);
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    )
};
init()
