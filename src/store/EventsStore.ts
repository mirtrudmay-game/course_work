import { makeAutoObservable, runInAction } from "mobx";
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

    async loadAllBoxes(): Promise<void> {
        try {
            const { data, status }: AxiosResponse<IGroupData[]> = await axios.get<IGroupData[]>(
                "/data-service/boxes/all",
            );

            console.log("groups", status, data);
            runInAction(() => {
                this.groupsList = data;
            });
        } catch (e) {
            console.log("error", e);
        }
    }

    async saveInvite(data: IGroupDataCreate): Promise<void> {
        try {
            await axios.post("/data-service/api/invitations", data);
        } catch (e) {}
    }
}

export const eventsStore = new EventsStore();
