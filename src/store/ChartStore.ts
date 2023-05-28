import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./RootStore";
import {ChartData, ChartOptions} from "chart.js";
import {IChartElement} from "../types/types";
import {chartData} from "../data/data";

interface IChartStore {
    dataDought: ChartData<"doughnut">;
    dataBar: ChartData<"bar">;
    optionsDought: ChartOptions<"doughnut">;
    optionsBar: ChartOptions<"bar">;
    totalBoxNumber: number;
    freeBoxNumber: number;
    totalCarNumber: number;
}

export class ChartStore implements IChartStore {
    dataDought: ChartData<"doughnut"> = {
        labels: [],
        datasets: [],
    };

    optionsBar: ChartOptions<"bar"> = {
        /*scales: {
            y: {
                beginAtZero: true,
            },
        },*/
    };

    dataBar: ChartData<"bar"> = {
        labels: [],
        datasets: [],
    };
    totalBoxNumber: number = 90;
    freeBoxNumber: number = 25;

    totalCarNumber: number = 65;
    optionsDought: ChartOptions<"doughnut"> = {
        devicePixelRatio: 2.0,
        layout: {
            padding: 0,
        },
        plugins: {
            /*title: {
                display: true,
                text: "Распределение числа автомобилей по моделям",
                font: {
                    size: 18,
                },
            },*/
            legend: {
                display: true,
                position: "right",
                labels: {
                    boxWidth: 60,
                    boxHeight: 15,
                    padding: 20,
                },
            },
            datalabels: {
                font: {
                    size: 18,
                },
                formatter: (value, context) => {
                    let sum = 0;
                    let dataArr = context.chart.data.datasets[0].data;
                    dataArr.map((data) => {
                        sum += data as number;
                    });
                    return ((value * 100) / sum).toFixed(2) + "%";
                },
                color: "rgba(0, 0, 0, 0.55)",
            },
        },
    };
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    private formatChartDoughtData = (data: IChartElement[]) => {
        const result: ChartData<"doughnut"> = {
            labels: [],
            datasets: [],
        };

        const dataSet: number[] = [];

        data.forEach((datum) => {
            result.labels?.push(datum.model_name);
            dataSet.push(datum.count_box);
        });

        result.datasets = [
            {
                label: " Число автомобилей",
                data: dataSet,
            },
        ];

        return result;
    };

    loadData = async () => {
        try {
            // const {data} = await axios.get<IChartElement[]>("/data-service/...");
            const data = chartData;

            runInAction(() => {
                this.dataDought = this.formatChartDoughtData(data);
                this.dataBar = this.formatChartBarData(data);
            });
        } catch (e: any) {}
    };

    private formatChartBarData(data: IChartElement[]) {
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
                label: "Число боксов",
                data: dataSetBoxes,
            },
            {
                label: "Число автомобилей",
                data: dataSetCars,
            },
        ];

        return result;
    }
}
