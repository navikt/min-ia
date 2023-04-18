import {mapTilRestStatus, RestRessurs, RestStatus} from '../integrasjoner/rest-status';
import {BASE_PATH} from "./konstanter";


interface KursDto {
    RegistrationID: string;
    Title: string;
    RegistrationUrl: string;
    RegistrationImageMediaStorageID: number;
    FrontImageMediaStorageID: number;
    CatalogListMediaStorageID: number | null;
    RegistrationFromDateTime: string;
    RegistrationToDateTime: string;
    RegistrationDeadline: string;
    RegistrationPlaceName: string;
    DescriptionInternal: string;
    CatalogText: string;
    Description: string;
    FrontPageDescription: string;
    ActiveWeb: number;
    ShowRegistrationForm: number;
    ShowInActivityList: number;
    configurable_custom: null | {
        Fylke: string;
        Type: string;
        Tema: string;
    };
}

export interface Kurs {
    id: string;
    tittel: string;
    tema?: string;
    type?: string;
    start: Date;
    slutt: Date;
    påmeldingsfrist: Date;
}

export type RestKursliste = RestRessurs<Kurs[]>;

const mapTilKurs = (kursDto: KursDto): Kurs => ({
    id: kursDto.RegistrationID,
    tittel: kursDto.Title,
    tema: kursDto.configurable_custom?.Tema,
    type: kursDto.configurable_custom?.Type,
    start: new Date(kursDto.RegistrationFromDateTime),
    slutt: new Date(kursDto.RegistrationToDateTime),
    påmeldingsfrist: new Date(kursDto.RegistrationDeadline),
});

export const hentRestKurs = async (): Promise<RestKursliste> => {
    try {
    const response = await fetch(BASE_PATH + "/kursoversikt");
        const restStatus = mapTilRestStatus(response.status);

        if (restStatus === RestStatus.Suksess) {
            const kursliste: Kurs[] = ((await response.json()) as KursDto[]).map(
                (kursDto) => mapTilKurs(kursDto)
            );
            return {
                status: RestStatus.Suksess,
                data: kursliste,
            };
        }
    } catch (error) {
    }

    return {status: RestStatus.Feil};
};
