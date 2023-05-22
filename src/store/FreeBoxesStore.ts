import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {IBoxResponse} from "../types/types";
import {RootStore} from "./RootStore";

interface IBoxesStore {
    freeBoxesList: IBoxResponse[];
    selectedBoxesIdx: number;
    successMessage: string;
    errorMessage: string;
}

export class FreeBoxesStore implements IBoxesStore {
    freeBoxesList: IBoxResponse[] = [];
    selectedBoxesIdx: number = -1;
    successMessage: string = "";

    errorMessage: string = "";
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async loadFreeByModelId(id: string): Promise<void> {
        try {
            const response = await axios.get<IBoxResponse[]>(`/data-service/boxes/freeByModel/${id}`);

            runInAction(() => {
                this.freeBoxesList = response.data;
            })

        } catch (e: any) {
            this.errorMessage = "Не удаётся получить список пустых боксов для заданной модели."
        }
    }


    setSelectedBox(indexes: Record<string, boolean>) {

    }
}
