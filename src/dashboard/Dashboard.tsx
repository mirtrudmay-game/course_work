import React, {FC, useEffect, useState} from "react";
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
import {Bar} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels, Title, CategoryScale, LinearScale, BarElement);

interface IInfoBlock {
    desc: string;
    count: number | string;
}

const InfoBlock: FC<IInfoBlock> = ({ desc, count }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/*<hr className={"w-50"} />*/}
            <span>{desc}</span>
            <p style={{ fontSize: "40px", marginBottom: "1em" }}>{count}</p>
        </div>
    );
};

export type DashboardProps = {};
const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { chartStore } = useStores();
    const [freePercent, setFreePercent] = useState<number>(0);

    const setData = async () => {
        await chartStore.loadData();
        setFreePercent(Math.round((chartStore.freeBoxNumber / chartStore.totalBoxNumber) * 10000) / 100);
    };

    useEffect(() => {
        setData();
    }, []);

    return (
        <Row className={"align-items-center"}>
            <Col xs={{ span: 5, offset: 1 }}>
                {/*<Doughnut options={chartStore.optionsDought} data={chartStore.dataDought} />*/}
                <Bar options={chartStore.optionsBar} data={chartStore.dataBar}></Bar>
            </Col>
            <Col xs={{ span: 3, offset: 1 }}>
                <InfoBlock desc={"Всего боксов"} count={chartStore.totalBoxNumber} />
                <InfoBlock desc={"Свободно"} count={`${freePercent}%`} />
                <InfoBlock desc={"Всего автомобилей"} count={chartStore.totalCarNumber} />
            </Col>
        </Row>
    );
};

export default observer(Dashboard);
