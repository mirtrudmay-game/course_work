import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { eventsStore } from "../store/EventsStore";

export function Filter() {
    const [dateFrom, setDateFrom] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(new Date());

    const handleStartDateChange = (date: any) => {
        setDateFrom(date);
    };

    const handleEndDateChange = (date: any) => {
        setDateTo(date);
    };

    const handleEnterBtnClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        eventsStore.loadFilteredGroups(dateFrom, dateTo).catch(console.error);
    };

    return (
        <Form className="col-8 p-3">
            <Form.Group>
                <Form.Label>Начало</Form.Label>
                <DatePicker selected={dateFrom} onChange={handleStartDateChange} showTimeSelect dateFormat="Pp" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Конец</Form.Label>
                <DatePicker selected={dateTo} onChange={handleEndDateChange} showTimeSelect dateFormat="Pp" />
            </Form.Group>
            <Button className="m-1" variant="primary" type="submit" onClick={handleEnterBtnClick}>
                Применить фильтр
            </Button>
        </Form>
    );
}
