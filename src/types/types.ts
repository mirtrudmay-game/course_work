export interface IModel {
    id: number;
    name: string
}

export interface ICreateBox {
    sequenceNumber: number;
    model: IModel;
    dailyCoast: number;
}

export interface ITableViewBox {
    sequenceNumber: number;
    modelName: string;
    dailyCoast: number;
    currentRent: number | null;
}
