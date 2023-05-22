/**
 * Модель.
 */

export interface IModelResponse {
    id_model: number;
    name: string
}

export interface IModelCreate {
    id_model: number | null;
    name: string
}



/**
 * Бокс.
 */

/*export interface IBox {
    box_number: number;
    model: IModel;
    daily_cost: number;
}*/

export interface IBox {
    box_number: number;
    id_model: number;
    model_name: string;
    daily_cost: number;
}


/*export interface ICreateBox {
    box_number: string;
    model: IOption;
    daily_cost: string;
}*/


/**
 * Клиент.
 */

export interface IRenter {
    idRenter: number;
    fullName: string;
    phone: string;
    address: string;
    receiptNumber: number;
}

export interface IEditRenter {
    fullName: string;
    phone: string;
    address: string;
}

export const createEditableRenterData = (renter: IRenter): IEditRenter => {
    return {
        fullName: renter.fullName,
        phone: renter.phone,
        address: renter.address,
    }
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

export interface IOption {
    value: string;
    label: string;
}

export function getOptions<Obj, Key extends keyof Obj>(arr: Obj[], keyValue: Key, keyLabel: Key) {
    return arr.map((el) => ({value: el[keyValue], label: el[keyLabel]} as IOption))
}

export function getOption<Obj, Key extends keyof Obj>(obj: Obj | null, keyValue: Key, keyLabel: Key) {
    if (!obj) return {value: "", label: ""};

    return {value: obj[keyValue], label: obj[keyLabel]} as IOption;
}