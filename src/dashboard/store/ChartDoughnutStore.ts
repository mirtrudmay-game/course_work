import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "../../store/RootStore";
import {ChartData, ChartOptions} from "chart.js";
import {IChartElement} from "../../types/types";
import {chartData} from "../../data/data";

interface IChartStore {
    data: ChartData<"doughnut">;
    options: ChartOptions<"doughnut">;
}

export class ChartDoughnutStore implements IChartStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    data: ChartData<"doughnut"> = {
        labels: [],
        datasets: [],
    };

    options: ChartOptions<"doughnut"> = {
        devicePixelRatio: 2.0,
        layout: {
            padding: 0,
        },
        plugins: {
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

    private formatData = (data: IChartElement[]) => {
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
                label: " Число автомобилей данной модели",
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
                this.data = this.formatData(data);
            });
        } catch (e: any) {}
    };
}
