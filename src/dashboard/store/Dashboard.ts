import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "../../store/RootStore";

interface IDashboardStore {
    totalBoxNumber: number;
    freeBoxNumber: number;
    totalCarNumber: number;
}

export class DashboardStore implements IDashboardStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    loadData = async () => {
        try {
            runInAction(() => {});
        } catch (e: any) {}
    };

    freeBoxNumber: number = 16;
    totalBoxNumber: number = 45;
    totalCarNumber: number = 20;

    get freeBoxPercent(): number | string {
        return Math.round((this.freeBoxNumber / this.totalBoxNumber) * 10000) / 100;
    }
}
