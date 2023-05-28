import {IChartElement} from "../types/types";

export const boxTableColumns = [
    {
        Header: "Номер бокса",
        accessor: "box_number",
    },
    {
        Header: "Поддерживаемая марка",
        accessor: "model_name",
    },
    {
        Header: "Стоимость (руб / сутки)",
        accessor: "daily_cost",
    },
];

export const clientsTableColumns = [
    {
        Header: "ФИО",
        accessor: "full_name",
    },
    {
        Header: "Телефон",
        accessor: "phone",
    },
    {
        Header: "Адрес",
        accessor: "address",
    },
    {
        Header: "Квитанция",
        accessor: "receipt_number",
    },
];

export const carsTableColumns = [
    {
        Header: "Номер машины",
        accessor: "automobile_number",
    },
    {
        Header: "ФИО владельца",
        accessor: "renter_full_name",
    },
    {
        Header: "Номер бокса",
        accessor: "box_number",
    },
    {
        Header: "Дата начала аренды",
        accessor: "rental_start_date",
    },
];
export const chartData: IChartElement[] = [
    {
        model_name: "Opel",
        count_box: 10,
        count_car: 3,
    },
    {
        model_name: "Ford",
        count_box: 20,
        count_car: 10,
    },
    {
        model_name: "Kia",
        count_box: 15,
        count_car: 5,
    },
];
