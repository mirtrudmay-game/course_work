import {computed, makeAutoObservable, observable, runInAction} from "mobx";
import {IEditRenter, IRenter} from "../types/types";
import {clients}  from "../data/data";

interface IClientsStore {
    clientsList: IRenter[];
    selectedClient: IRenter | null;
}

class ClientsStore implements IClientsStore {
    clientsList: IRenter[] = [];
    selectedClient: IRenter | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadAll();
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

    getById(id: string | undefined): IRenter | null {
        if (!id) return null;
        return this.clientsList.find((client) => client.idRenter === +id) || null;
    }

    setSelectedClient(indexes: Record<string, boolean>) {
        const selected = Object.entries(indexes).filter(([key, value]) => value);

        if (!selected.length) {
            this.selectedClient = null;
            return;
        }

        const idx = +selected[0][0];
        this.selectedClient = this.clientsList[idx];

    }

    updateSelectedClient(data: IEditRenter) {
        return false;
    }
}

export const clientsStore = new ClientsStore();
