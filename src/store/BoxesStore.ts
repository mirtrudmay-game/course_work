import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import {BoxInput, BoxTableView} from "../types/types";
import {boxes}  from "../data/data";

interface IBoxesStore {
    boxesList: BoxTableView[];
    selectedBoxes: BoxTableView[];
    freeBoxesByCurrentModel: BoxTableView[];
    errorMessage: string;
}

class BoxesStore implements IBoxesStore {
    boxesList: BoxTableView[] = [];
    selectedBoxes: BoxTableView[] = [];
    freeBoxesByCurrentModel: BoxTableView[] = [];
    errorMessage: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    async loadAll(): Promise<void> {
        try {
            const response = await axios.get("/data-service/boxes/all");

            runInAction(() => {
              this.boxesList = response.data;
            })

        } catch (e: any) {
            this.errorMessage = "Не удаётся получить список боксов."
        }

        this.boxesList = boxes;
    }

    setSelectedBoxes (ids: Object) {

    }

    async deleteBoxes() {
        console.log("deleteBoxes", this.selectedBoxes)
        for (const box of this.selectedBoxes) {
            try {
                await axios.post("/data-service/boxes/delete", box.sequenceNumber);
            } catch (e: any) {
                this.errorMessage = "Не удаётся удалить бокс."
            }
        }
    }

    async saveNewBox(box: BoxInput): Promise<void> {
        console.log("saveNewBox", box);
        try {
            await axios.post("/data-service/boxes/add", box);
        } catch (e) {
            this.errorMessage = "Не удаётся сохранить бокс."
        }
    }


    async increaseCoast(coef: number) {
        console.log("increaseCoast", coef)
        try {
            await axios.post(`/data-service/boxes/costUp/${coef}`);
        } catch (e) {
            this.errorMessage = "Не удаётся выполнить операцию."
        }
    }

    async loadFreeByModelId(id: number) {
/*        try {
            const response = await axios.get(`/data-service/boxes/freeByModel/${id}`);

            runInAction(() => {
                this.freeBoxesByCurrentModel = response.data;
            })

        } catch (e) {}*/

        this.freeBoxesByCurrentModel = boxes.filter((b) => b.modelName == "Opel");
    }

    clearError() {
        this.errorMessage = "";
    }
}

export const boxesStore = new BoxesStore();
