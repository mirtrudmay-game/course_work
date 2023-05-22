import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { IModelResponse, IBox} from "../types/types";
import {models}  from "../data/data";
import {Mode} from "fs";

interface IModelsStore {
    modelsList: IModelResponse[];
}

class ModelsStore implements IModelsStore {
    modelsList: IModelResponse[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadAll();
    }

    async loadAll(): Promise<void> {
        try {
            const response = await axios.get("/data-service/models/all");

            runInAction(() => {
                this.modelsList = response.data;
            })

        } catch (e) {

        }

        this.modelsList = models;
    }

    async createModel(value: string) {

    }

    getById(id: string | undefined): IModelResponse | null {
        if (!id) return null;
        return this.modelsList.find((model) => model.id_model === +id) || null;
    }
}

export const modelsStore = new ModelsStore();
