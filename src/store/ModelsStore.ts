import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { IModel, IBoxView} from "../types/types";
import {boxes, models}  from "../data/data";

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
}

export const modelsStore = new ModelsStore();
