import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "../../store/RootStore";
import {ChartData, ChartOptions} from "chart.js";
import {IChartElement} from "../../types/types";
import axios from "axios";

interface IChartBarStore {
    data: ChartData<"bar">;
    options: ChartOptions<"bar">;
    totalBoxNumber: number;
    totalCarNumber: number;
}

export class ChartBarStore implements IChartBarStore {
    totalBoxNumber: number = 0;
    totalCarNumber: number = 0;
    options: ChartOptions<"bar"> = {};
    data: ChartData<"bar"> = {
        labels: [],
        datasets: [],
    };

    get freeBoxPercent(): number | string {
        if (!this.totalBoxNumber) return 0;

        return Math.round(((this.totalBoxNumber - this.totalCarNumber) / this.totalBoxNumber) * 10000) / 100;
    }

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    loadData = async () => {
        try {
            const carsPromise = await this.rootStore.carsStore.loadAll();
            const boxesPromise = await this.rootStore.boxesStore.loadAll();
            const chartPromise = await axios.get<IChartElement[]>("/data-service/models/report");

            Promise.all([carsPromise, boxesPromise]).then(() => {
                runInAction(() => {
                    this.totalCarNumber = this.rootStore.carsStore.carsList.length;
                    this.totalBoxNumber = this.rootStore.boxesStore.boxesList.length;
                    this.data = this.formatData(chartPromise.data);
                });
            });
        } catch (e: any) {}
    };

    private formatData(data: IChartElement[]) {
        const result: ChartData<"bar"> = {
            labels: [],
            datasets: [],
        };

        const dataSetBoxes: number[] = [];
        const dataSetCars: number[] = [];

        data.forEach((datum) => {
            result.labels?.push(datum.model_name);
            dataSetBoxes.push(datum.count_box);
            dataSetCars.push(datum.count_car);
        });

        result.datasets = [
            {
                label: " Число боксов",
                data: dataSetBoxes,
                backgroundColor: "#C0C0C0",
            },
            {
                label: " Число автомобилей",
                data: dataSetCars,
                backgroundColor: "#ffc107",
            },
        ];

        return result;
    }
}
