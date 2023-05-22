import {makeAutoObservable, runInAction} from "mobx";
import {IRenter} from "../types/types";
import {RootStore} from "./RootStore";
import axios from "axios";

interface IClientsStore {
    clientsList: IRenter[];
    selectedClient: IRenter | null;
    errorMessage: string;
    successMessage: string;
}

export class ClientsStore implements IClientsStore {
    errorMessage: string = "";
    successMessage: string = "";
    clientsList: IRenter[] = [];
    selectedClient: IRenter | null = null;

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this);
    }

    async loadAll(): Promise<void> {
        try {
            const response = await axios.get<IRenter[]>("/data-service/renters/all");

            runInAction(() => {
                this.clientsList = response.data;
            })

        } catch (e) {
            this.errorMessage = "Ошибка загрузки списка клиентов.";
        }

    }

    getById(id: string): IRenter {
        return this.clientsList.find((client) => client.id_renter === +id)!;
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

    async updateSelectedClient(data: IRenter) {
        try {
            const response = await axios.post("/data-service/renters/add", data);

            await this.loadAll();
            this.successMessage = "Данные успешно обновлены.";
        } catch (error) {
            this.errorMessage = "Ошибка обновления данных о пользователе.";
        }
    }
}

