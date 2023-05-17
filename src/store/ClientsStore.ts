import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import {IClient} from "../types/types";
import {clients}  from "../data/data";

interface IClientsStore {
    clientsList: IClient[];
}

class ClientsStore implements IClientsStore {
    clientsList: IClient[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async loadAll(): Promise<void> {
        try {
            const response = await axios.get("/data-service/renters/all");

            runInAction(() => {
                this.clientsList = response.data;
            })

        } catch (e) {

        }
        this.clientsList = clients;
    }

}

export const clientsStore = new ClientsStore();
