import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { IModel, ITableViewBox} from "../types/types";
import {boxes, models}  from "../data/data";
import {Mode} from "fs";

interface IModelsStore {
    modelsList: IModel[];
}

class ModelsStore implements IModelsStore {
    modelsList: IModel[] = [];

    constructor() {
        makeAutoObservable(this);
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

    getById(id: string | undefined): IModel | null {
        if (!id) return null;
        return this.modelsList.find((model) => model.id === +id) || null;
    }
}

export const modelsStore = new ModelsStore();
