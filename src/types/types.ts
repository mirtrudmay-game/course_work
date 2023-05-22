/**
 * Модель.
 */

export interface IModelResponse {
    id_model: number;
    name: string
}

export interface IModelCreate {
    name: string
}

/**
 * Бокс.
 */

export interface IBoxResponse {
    box_number: number;
    id_model: number;
    model_name: string;
    daily_cost: number;
}

export interface IBoxCreate {
    box_number: number;
    id_model: number | null;
    model_name: string;
    daily_cost: number;
}


/**
 * Клиент.
 */

export interface IRenter {
    id_renter: number;
    full_name: string;
    phone: string;
    address: string;
    receipt_number: number;
}

export interface IRenterCreate {
    full_name: string;
    phone: string;
    address: string;
    receipt_number: number;
}

/**
 * Машина (бронирование).
 */

export interface ICarResponse {
    car_number: number;
    box_number: number;
    renter_name: string;
    model_name: string;
    rental_start_date: string;
}

export interface ICarCreate {
    car_number: number;
    box_number: number;
    id_renter: number;
    id_model: number;
    rental_start_date: string;
}

/*export interface Car {
    carNumber: number;
    box: BoxInput;
    renter: IRenter;
    model: IModel;
    rentalStartDate: Date;
}

export interface CarInput {
    carNumber: number | null;
    box: BoxInput | null;
    renter: IRenter;
    model: IModel | null;
    rentalStartDate: Date;
}*/

export class IOption {
    value: string;
    label: string;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}

export function getOptions<Obj, Key extends keyof Obj>(arr: Obj[], keyValue: Key, keyLabel: Key) {
    return arr.map((el) => ({value: el[keyValue], label: el[keyLabel]} as IOption))
}

export function getOption<Obj, Key extends keyof Obj>(obj: Obj | null, keyValue: Key, keyLabel: Key) {
    if (!obj) return {value: "", label: ""};

    return {value: obj[keyValue], label: obj[keyLabel]} as IOption;
}

