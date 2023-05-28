import React, {useEffect, useState} from "react";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import {observer} from "mobx-react-lite";
import {useStores} from "../store/RootStore";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Col, Row} from "react-bootstrap";
import {Bar, Doughnut} from "react-chartjs-2";
import {InfoBlock} from "./InfoBlock";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels, Title, CategoryScale, LinearScale, BarElement);

export type DashboardProps = {};

function ChartCards() {
    const { chartDoughnutStore, chartBarStore } = useStores();
    const [chartIdx, setChartIdx] = useState<number>(0);

    useEffect(() => {
        chartDoughnutStore.loadData();
        chartBarStore.loadData();
    }, []);

    if (!chartIdx) return <Bar options={chartBarStore.options} data={chartBarStore.data}></Bar>;
    return <Doughnut options={chartDoughnutStore.options} data={chartDoughnutStore.data} />;
}

const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { dashboardStore } = useStores();

    useEffect(() => {
        dashboardStore.loadData();
    }, []);

    return (
        <Row className={"align-items-center"} style={{ height: "80vh" }}>
            <Col xs={{ span: 5, offset: 1 }}>
                <ChartCards />
            </Col>
            <Col xs={{ span: 3, offset: 1 }}>
                <InfoBlock desc={"Всего боксов"} count={dashboardStore.totalBoxNumber} />
                <InfoBlock desc={"Свободно"} count={`${dashboardStore.freeBoxPercent}%`} />
                <InfoBlock desc={"Всего автомобилей"} count={dashboardStore.totalCarNumber} />
            </Col>
        </Row>
    );
};

export default observer(Dashboard);
