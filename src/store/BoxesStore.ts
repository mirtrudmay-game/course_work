import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import {IBox, IBoxView} from "../types/types";
import {boxes, models}  from "../data/data";

interface IBoxesStore {
    boxesList: IBoxView[];
    selectedBoxes: IBoxView[];
    error: string;
}

class BoxesStore implements IBoxesStore {
    boxesList: IBoxView[] = [];
    selectedBoxes: IBoxView[] = [];
    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    async loadAll(): Promise<void> {
        try {
            const respose = await axios.get("/data-service/boxes/all");

            runInAction(() => {
              this.boxesList = respose.data;
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

    async saveNewBox(box: IBox): Promise<void> {
        console.log("saveNewBox", box);
        try {
            await axios.post("/data-service/boxes/add", box);
        } catch (e) {}
    }


    async increaseCoast(coef: number) {
        console.log("increaseCoast", coef)
        try {
            await axios.post("/data-service/boxes/costUp", {"coef": coef});
        } catch (e) {}
    }
}

export const boxesStore = new BoxesStore();
