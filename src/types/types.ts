export interface IModel {
    id: number;
    name: string
}

export interface IBoxView {
    sequenceNumber: number;
    modelName: string;
    dailyCoast: number;
}

export interface IBoxCreate {
    sequenceNumber: number;
    model: IModel;
    dailyCoast: number;
}


export interface IClient {
    id_renter: number;
    full_name: string;
    phone: string;
    address: string;
    receipt_number: number;
}