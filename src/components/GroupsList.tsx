import { FC } from "react";
import { IGroupData } from "../types/types";
import { observer } from "mobx-react-lite";
import { ListGroup } from "react-bootstrap";

interface IGroupsList {
    data: IGroupData[];
}

interface IEntry {
    _key: string;
    value: string | number;
}

const GroupCharacter: FC<IEntry> = ({ _key, value }) => {
    return (
        <p>
            <span style={{ fontWeight: 700 }}>{_key}: </span>
            {value}
        </p>
    );
};

const GroupsList: FC<IGroupsList> = ({ data }) => {
    return (
        <ListGroup>
            {data.map((group, index) => (
                <ListGroup.Item key={index}>
                    <h5>
                        <span style={{ fontWeight: 700 }}>Тема: </span>
                        {group.name}
                    </h5>

                    {group.intervals.map((interval, index) => (
                        <div className="p-3" key={index}>
                            <GroupCharacter _key={"Начало"} value={interval.start.toString()} />
                            <GroupCharacter _key={"Конец"} value={interval.end.toString()} />
                        </div>
                    ))}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default observer(GroupsList);
