import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IBox, ICreateBox} from "../types/types";
import {boxes}  from "../data/data";

interface IBoxesStore {
    boxesList: IBox[];
    selectedBoxesIdxs: Record<string, boolean>;
    errorMessage: string;
    haveSelected: boolean;
    successMessage: string;
}

class BoxesStore implements IBoxesStore {
    boxesList: IBox[] = [];
    selectedBoxesIdxs: Record<string, boolean> = {};
    errorMessage: string = "";
    haveSelected: boolean =  false;
    successMessage: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    async loadAll(): Promise<void> {
        /*try {
            const response = await axios.get("/data-service/boxes/all");

            runInAction(() => {
              this.boxesList = response.data;
            })

        } catch (e: any) {
            this.errorMessage = "Не удаётся получить список боксов."
        }*/

        this.boxesList = boxes;
    }


    async deleteSelectedBox() {
        console.log("deleteBox, idxs:", this.selectedBoxesIdxs)

        const idx: number = +Object.keys(this.selectedBoxesIdxs)[0];
        if (this.boxesList[idx].boxNumber < 100) {
            this.errorMessage = "Не удаётся удалить бокс.";
            return;
        }
        delete this.boxesList[idx];
        this.successMessage = "Бокс успешно удалён";

        /*try {
            for (const [key] of Object.keys(this.selectedBoxesIdxs)) {
                const response = await axios.post("/data-service/boxes/delete", this.boxesList[+key]);

                if (response.status === 400) {
                    this.errorMessage = response.data.description;
                    throw new Error(response.data.description);
                }
            }
            this.loadAll();
        } catch (e: any) {
            this.errorMessage = "Не удаётся удалить бокс." + e.message;
        }*/
    }


    async saveNewBox(data: ICreateBox): Promise<void> {
        console.log("saveNewBox", data);

        try {
            const box: IBox = {
                boxNumber: +data.boxNumber,
                model: {
                    id: !data.model.value ? -1 : +data.model.value,
                    name: data.model.label,
                },
                dailyCoast: +data.dailyCoast
            }

            console.log("saveNewBox: formatted", data);
            this.successMessage = "Бокс успешно добавлен";
            this.boxesList.push(box);

        } catch (e) {

        }



        /*try {
            await axios.post("/data-service/boxes/add", data);
            this.loadAll();
        } catch (e) {
            this.errorMessage = "Не удаётся сохранить бокс."
        }*/
    }


    async increaseCoast(coef: number) {
        console.log("increaseCoast", coef)
        /*try {
            await axios.post(`/data-service/boxes/costUp/${coef}`);
            this.loadAll();
        } catch (e) {
            this.errorMessage = "Не удаётся выполнить операцию."
        }*/

        this.boxesList.forEach((box) => box.dailyCoast *= coef);
    }

    setSelectedBoxes(indexes: Record<string, boolean>) {
        this.selectedBoxesIdxs = indexes;
        this.haveSelected = Object.values(this.selectedBoxesIdxs).includes(true);
    }

    clearErrorMessage() {
        this.errorMessage = "";
    }

    clearSuccessMessage() {
        this.successMessage = "";
    }
}

export const boxesStore = new BoxesStore();
