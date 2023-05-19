import {Model, BoxTableView, Renter} from "../types/types";

export const clients: Renter[] = [
    {
        idRenter: 10,
        fullName: "Петров Петр Петрович",
        receiptNumber: 110,
        phone: "+7(910)277-33-73",
        address: "petrov@gmail.com"
    },
    {
        idRenter: 11,
        fullName: "Карпов Карп Поликарпович",
        receiptNumber: 115,
        phone: "+7(905)111-19-73",
        address: "karp@gmail.com"
    }
];


export const models: Model[] = [
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

export const boxes: BoxTableView[] = [
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

export const boxTableColumns = [
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

export const clientsTableColumns = [
    {
        Header: 'ФИО',
        accessor: 'idRenter',
    },
    {
        Header: 'Телефон',
        accessor: 'phone',
    },
    {
        Header: 'Адрес',
        accessor: 'address',
    },
    {
        Header: 'Квитанция',
        accessor: 'receiptNumber',
    },
]