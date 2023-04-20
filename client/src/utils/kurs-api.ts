export interface KursDto {
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

export const mapTilKurs = (kursDto: KursDto): Kurs => ({
    id: kursDto.RegistrationID,
    tittel: kursDto.Title,
    tema: kursDto.configurable_custom?.Tema,
    type: kursDto.configurable_custom?.Type,
    start: new Date(kursDto.RegistrationFromDateTime),
    slutt: new Date(kursDto.RegistrationToDateTime),
    påmeldingsfrist: new Date(kursDto.RegistrationDeadline),
});