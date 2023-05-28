import React, {useEffect} from "react";
import {ArcElement, Chart as ChartJS, Colors, Legend, Title, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {observer} from "mobx-react-lite";
import {useStores} from "../store/RootStore";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels, Title);

export type DashboardProps = {};
const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { chartStore } = useStores();

    useEffect(() => {
        chartStore.loadData();
    }, []);

    return (
        <div className={"row justify-content-center"}>
            <div className={"col col-5"}>
                <Doughnut options={chartStore.optionsDought} data={chartStore.dataDought} />;
            </div>
            <></>
        </div>
    );
};

export default observer(Dashboard);
