import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "../../store/RootStore";
import {ChartData, ChartOptions} from "chart.js";
import {IChartElement} from "../../types/types";
import {chartData} from "../../data/data";

interface IChartBarStore {
    data: ChartData<"bar">;
    options: ChartOptions<"bar">;
}

export class ChartBarStore implements IChartBarStore {
    options: ChartOptions<"bar"> = {};
    data: ChartData<"bar"> = {
        labels: [],
        datasets: [],
    };

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    loadData = async () => {
        try {
            // const {data} = await axios.get<IChartElement[]>("/data-service/...");
            const data = chartData;

            runInAction(() => {
                this.data = this.formatData(data);
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
