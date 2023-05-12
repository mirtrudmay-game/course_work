import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import {ICreateBox, IModel, ITableViewBox} from "../types/types";
import {boxes, models}  from "../data/data";

interface IUserStore {
    boxesList: ITableViewBox[];
}

class Store implements IUserStore {
    boxesList: ITableViewBox[] = [];
    modelsList: IModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async loadAllBoxes(): Promise<void> {
        this.boxesList = boxes;
    }

    addBox(box: ICreateBox) {
        // отправить box в базу.
        const newBox: ITableViewBox = {
            modelName: box.model.name,
            dailyCoast: box.dailyCoast,
            sequenceNumber: box.sequenceNumber,
            currentRent: null,
        }

        boxes.push(newBox);
    }

    async saveNewBox(data: ICreateBox): Promise<void> {
        try {
            await axios.post("/data-service/boxes/add", data);
        } catch (e) {}
    }

    async loadAllModels(): Promise<void> {
        this.modelsList = models;
    }

}

export const store = new Store();
