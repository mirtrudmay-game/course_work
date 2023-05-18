import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import {BoxInput, Box} from "../types/types";
import {boxes}  from "../data/data";

interface IBoxesStore {
    boxesList: Box[];
    selectedBoxes: Box[];
    freeBoxesByCurrentModel: Box[];
}

class BoxesStore implements IBoxesStore {
    boxesList: Box[] = [];
    selectedBoxes: Box[] = [];
    freeBoxesByCurrentModel: Box[] = [];

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
            }
        }
    }

    async saveNewBox(box: BoxInput): Promise<void> {
        console.log("saveNewBox", box);
        try {
            await axios.post("/data-service/boxes/add", box);
        } catch (e) {}
    }


    async increaseCoast(coef: number) {
        console.log("increaseCoast", coef)
        try {
            await axios.post(`/data-service/boxes/costUp/${coef}`);
        } catch (e) {}
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
}

export const boxesStore = new BoxesStore();
