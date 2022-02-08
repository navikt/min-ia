import { Heading } from '@navikt/ds-react'
import { PageBannerSVG } from './PageBannerSVG';
import { SCREEN_MD_MIN, SCREEN_SM_MIN } from '../../utils/konstanter';

export const PageBanner = (props: {
    isFrontPage: boolean;
    title: string;
    iconUrl: string;
    kontekst: string;
}) => {
    return (
        <div >
            <div>
                <div>
                    <Heading level={"1"} size={'2xlarge'}>
                        {props.title}
                    </Heading>
                </div>
                <PageBannerSVG/>
            </div>
        </div>
    );
};
