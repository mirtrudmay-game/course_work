export interface IEventData {
    name: string;
    /*interval: IIntervalData;*/
    startDate: Date;
    endDate: Date;
    note?: string;
}

export interface IIntervalData {
    start: Date;
    end: Date;
}

export interface IGroupData {
    name: string;
    invitationUUID: any;
    intervals: IIntervalData[];
    color?: string;
    note: "";
}

export interface IGroupDataCreate {
    name: string;
    intervals: IIntervalData[];
    color?: string;
    note: "";
}
