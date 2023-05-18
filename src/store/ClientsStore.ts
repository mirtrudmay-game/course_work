import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import {Renter} from "../types/types";
import {clients}  from "../data/data";

interface IClientsStore {
    clientsList: Renter[];
}

class ClientsStore implements IClientsStore {
    clientsList: Renter[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async loadAll(): Promise<void> {
        this.clientsList = clients;
/*        try {
            const response = await axios.get("/data-service/renters/all");

            runInAction(() => {
                this.clientsList = response.data;
            })

        } catch (e) {
        }*/

    }

    getById(id: string | undefined): Renter | null {
        if (!id) return null;
        return this.clientsList.find((client) => client.idRenter === +id) || null;
    }
}

export const clientsStore = new ClientsStore();
