interface IModel {
    id: number;
    name: string
}

export interface IBox {
    sequenceNumber: number;
    model: IModel;
    dailyCoast: number;
}
