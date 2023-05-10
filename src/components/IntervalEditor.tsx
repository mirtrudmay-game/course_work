// @flow
import * as React from "react";
import { Button, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FC, useState } from "react";

interface Props {
    onSubmitHandler: (start: Date, end: Date) => void;
    onCancelHandler: () => void;
}

export const IntervalEditor: FC<Props> = ({ onSubmitHandler, onCancelHandler }) => {
    const _endDate = new Date();
    _endDate.setMinutes(_endDate.getMinutes() + 30);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(_endDate);

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date) => {
        setEndDate(date);
    };

    const _onSubmitHandler = () => {
        onSubmitHandler(startDate, endDate);
    };

    return (
        <>
            <Row>
                <Col xs={2}>
                    <label>Начало интервала: </label>
                </Col>
                <Col xs={4}>
                    <DatePicker selected={startDate} onChange={handleStartDateChange} showTimeSelect dateFormat="Pp" />
                </Col>
                <Col xs={2}>
                    <label>Конец интервала: </label>
                </Col>
                <Col xs={4}>
                    <DatePicker selected={endDate} onChange={handleEndDateChange} showTimeSelect dateFormat="Pp" />
                </Col>
            </Row>
            <Row className="mb-3 mt-3">
                <Col xs={3}>
                    <Button onClick={onCancelHandler} variant={"secondary"} className="w-100">
                        Отменить
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button onClick={_onSubmitHandler} className="w-100">
                        Добавить
                    </Button>
                </Col>
            </Row>
        </>
    );
};
