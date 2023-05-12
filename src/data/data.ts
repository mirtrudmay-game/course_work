import {ICreateBox, IModel, ITableViewBox} from "../types/types";

export const models: IModel[] = [
    {
        name: "Ford",
        id: 100
    },
    {
        name: "Opel",
        id: 101
    },
    {
        name: "Lada",
        id: 102
    },
    {
        name: "Kia",
        id: 103
    }
]

export const boxes: ITableViewBox[] = [
    {
        sequenceNumber: 100,
        modelName: models[0].name,
        dailyCoast: 1200,
        currentRent: 155255,
    },
    {
        sequenceNumber: 105,
        modelName: models[1].name,
        dailyCoast: 1000,
        currentRent: 155300,
    }
]

export const columns = [
        {
            Header: 'Номер бокса',
            accessor: 'sequenceNumber',
        },
        {
            Header: 'Поддерживаемая марка',
            accessor: 'modelName',
        },
        {
            Header: 'Стоимость (руб / сутки)',
            accessor: 'dailyCoast',
        },
        {
            Header: 'Текущая аренда (№ квитанции)',
            accessor: 'currentRent',
        },
    ]