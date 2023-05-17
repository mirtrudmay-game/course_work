export interface IModel {
    id: number;
    name: string
}

export interface IBoxView {
    sequenceNumber: number;
    modelName: string;
    dailyCoast: number;
    // машина
}

export interface IBox {
    sequenceNumber: number;
    model: IModel;
    dailyCoast: number;
}


export interface IClient {
    idRenter: number;
    fullName: string;
    phone: string;
    address: string;
    receiptNumber: number;
}

export interface ICar {
    carNumber: number;
    box: IBox;
    renter: IClient;
    model: IModel;
    rentalStartDate: Date;
}

export interface IOption {
    value: string;
    label: string;
}