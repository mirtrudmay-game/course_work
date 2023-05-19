export interface Model {
    id: number;
    name: string
}

export interface BoxTableView {
    sequenceNumber: number;
    modelName: string;
    dailyCoast: number;
}

export interface BoxInput {
    sequenceNumber: number;
    model: Model;
    dailyCoast: number;
}


export interface Renter {
    idRenter: number | null;
    fullName: string;
    phone: string;
    address: string;
    receiptNumber: number | null;
}

/*export interface RenterInput {
    idRenter: number | null;
    fullName: string | null;
    phone: string | null;
    address: string | null;
    receiptNumber: number | null;
}*/

export interface Car {
    carNumber: number;
    box: BoxInput;
    renter: Renter;
    model: Model;
    rentalStartDate: Date;
}

export interface CarInput {
    carNumber: number | null;
    box: BoxInput | null;
    renter: Renter;
    model: Model | null;
    rentalStartDate: Date;
}

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