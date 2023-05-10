import { makeAutoObservable, runInAction } from "mobx";
import { IEventData, IGroupData, IGroupDataCreate } from "../types/types";
import { AxiosResponse } from "axios";
import axios from "axios";
interface IUserStore {
    groupsList: IGroupData[];
}

class EventsStore implements IUserStore {
    groupsList: IGroupData[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async loadAllEvents(): Promise<void> {
        try {
            const { data, status }: AxiosResponse<IGroupData[]> = await axios.get<IGroupData[]>(
                "/calendar-service/api/groups",
            );

            console.log("groups", status, data);
            runInAction(() => {
                this.groupsList = data;
            });
        } catch (e) {
            console.log("error", e);
        }
    }

    async loadFilteredGroups(dateFrom: Date, dateTo: Date): Promise<void> {
        try {
            const { data, status }: AxiosResponse<IGroupData[]> = await axios.get<IGroupData[]>(
                "/calendar-service/api/groups",
                {
                    params: { dateFrom: dateFrom.toJSON(), dateTo: dateTo.toJSON() },
                },
            );

            console.log(status, data);
            runInAction(() => {
                this.groupsList = data;
            });
        } catch (e) {
            console.log("error", e);
        }
    }

    async saveInvite(data: IGroupDataCreate): Promise<void> {
        try {
            await axios.post("/invitations-service/api/invitations", data);
        } catch (e) {}
    }

    async saveEvent(data: IEventData): Promise<void> {
        try {
            await axios.post("/events-service/api/events", data);
        } catch (e) {}
    }
}

export const eventsStore = new EventsStore();
