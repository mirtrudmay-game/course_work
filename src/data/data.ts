import {IModel, IBoxView, IClient} from "../types/types";

export const clients: IClient[] = [
    {
        id_renter: 10,
        full_name: "Петров Петр Петрович",
        receipt_number: 110,
        phone: "+7(910)277-33-73",
        address: "petrov@gmail.com"
    },
    {
        id_renter: 11,
        full_name: "Карпов Карп Поликарпович",
        receipt_number: 115,
        phone: "+7(905)111-19-73",
        address: "karp@gmail.com"
    }
];


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

export const boxes: IBoxView[] = [
    {
        sequenceNumber: 100,
        modelName: models[0].name,
        dailyCoast: 1200,
    },
    {
        sequenceNumber: 105,
        modelName: models[1].name,
        dailyCoast: 1000,
    },
    {
        sequenceNumber: 106,
        modelName: models[2].name,
        dailyCoast: 800,
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
    ]