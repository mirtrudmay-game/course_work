/**
 * Модель.
 */

export interface IModel {
    id: number;
    name: string
}


/**
 * Бокс.
 */

export interface IBox {
    boxNumber: number;
    model: IModel;
    dailyCoast: number;
}

export interface ITableViewBox {
    boxNumber: number;
    modelName: string;
    dailyCoast: number;
}

export const createTableViewBoxData = (box: IBox): ITableViewBox => {
    return {
        modelName: box.model.name,
        boxNumber: box.boxNumber,
        dailyCoast: box.dailyCoast
    }
}


export interface ICreateBox {
    boxNumber: string;
    model: IOption;
    dailyCoast: string;
}


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