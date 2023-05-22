import {IModelResponse, IRenter} from "../types/types";

export const clients: IRenter[] = [
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


export const models: IModelResponse[] = [
    {
        name: "Ford",
        id_model: 100
    },
    {
        name: "Opel",
        id_model: 101
    },
    {
        name: "Lada",
        id_model: 102
    },
    {
        name: "Kia",
        id_model: 103
    }
]


export const boxTableColumns = [
        {
            Header: 'Номер бокса',
            accessor: 'box_number',
        },
        {
            Header: 'Поддерживаемая марка',
            accessor: 'model_name',
        },
        {
            Header: 'Стоимость (руб / сутки)',
            accessor: 'daily_cost',
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