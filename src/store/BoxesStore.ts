import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {IBox, IModelResponse, IModelCreate, IRenter} from "../types/types";
import {IBoxCreateData} from "../containers/boxes/NewBoxModal";

interface IBoxesStore {
    boxesList: IBox[];
    selectedBoxesIdx: number;
    errorMessage: string;
    successMessage: string;
}

class BoxesStore implements IBoxesStore {
    boxesList: IBox[] = [];
    selectedBoxesIdx: number = -1;
    errorMessage: string = "";
    successMessage: string = "";

    constructor() {
        makeAutoObservable(this);

        this.loadAll();
    }

    async loadAll(): Promise<void> {
        try {
            const response = await axios.get<IBox[]>("/data-service/boxes/all");

            runInAction(() => {
                this.boxesList = response.data;
            })

        } catch (e: any) {
            this.errorMessage = "Не удаётся получить список боксов."
        }

        /*this.boxesList = boxes;*/
    }


    async deleteSelectedBox() {
        let response;

        try {
            const id = this.boxesList[+this.selectedBoxesIdx].box_number;
            console.log("Удаляем бокс №", id);

            await axios.delete(`/data-service/boxes/delete/${id}`);

            // ИЛИ delete this.boxesList[+this.selectedBoxesIdx];

            await this.loadAll();
            this.successMessage = "Бокс успешно удалён.";

        } catch (error) {
            if ((error as AxiosError)?.response?.status === 400) {
                this.errorMessage = "Ошибка удаления. Выбранный бокс содержит автомобиль. Прежде чем удалить бокс, его необходимо освободить.";
            } else {
                this.errorMessage = "Ошибка удаления.";
            }
        }
    }


    async saveNewBox(data: IBoxCreateData): Promise<void> {

        const box: IBox  = {
            box_number: +data.box_number,
            daily_cost: +data.daily_cost,
            id_model: +data.model.value,
            model_name: data.model.label
        }

        console.log("Сохраняем объект", box);

        if (!box.id_model) {
            const model: IModelCreate = {
                id_model: null,
                name: data.model.label
            }

            console.log("Сохраняем модель", model);

            try {
                const response = await axios.post<IModelResponse>("/data-service/models/add", model);

                box.id_model = response.data.id_model;
            } catch (error) {
                this.errorMessage = "Ошибка добавления новой модели. "
            }
        }

        try {
            console.log("А теперь собранный бокс", box);
            await axios.post("/data-service/boxes/add", box);

            // ИЛИ this.boxesList.push(box)

            await this.loadAll();
            this.successMessage = "Бокс успешно добавлен.";
        } catch (error) {
            this.errorMessage = "Ошибка добавления бокса."
        }


        /*try {
            await axios.post("/data-service/boxes/add", data);
            this.loadAll();
        } catch (e) {
            this.errorMessage = "Не удаётся сохранить бокс."
        }*/
    }


    async increasecost(coef: number) {
        console.log("increasecost", coef)
        /*try {
            await axios.post(`/data-service/boxes/costUp/${coef}`);
            this.loadAll();
        } catch (e) {
            this.errorMessage = "Не удаётся выполнить операцию."
        }*/

        /*this.boxesList.forEach((box) => box.daily_cost *= coef);*/
    }

    setSelectedBox(indexes: Record<string, boolean>) {
        const selectedList = Object.entries(indexes).filter(([idx, value]) => value);

        if (selectedList.length > 0) {
            this.selectedBoxesIdx = +selectedList[0][0];
            return;
        }
        this.selectedBoxesIdx = -1;

    }

    clearErrorMessage() {
        this.errorMessage = "";
    }

    clearSuccessMessage() {
        this.successMessage = "";
    }
}

export const boxesStore = new BoxesStore();
