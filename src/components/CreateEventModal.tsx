import React, { ChangeEvent, FC, useState } from "react";
import { IEventData } from "../types/types";
import { eventsStore } from "../store/EventsStore";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface ICreateEventModal {
    isShow: boolean;
    onHide: () => void;
}

export const CreateEventModal: FC<ICreateEventModal> = ({ isShow, onHide }) => {
    const [name, setName] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date) => {
        setEndDate(date);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSaveBtnClick = () => {
        const event: IEventData = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            note: "",
        };

        eventsStore.saveEvent(event).catch(console.error);
    };
    const _onHide = () => {
        onHide();
    };

    return (
        <Modal size="lg" show={isShow} onHide={_onHide} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Новое событие</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="col-8">
                    <Form.Group>
                        <Form.Label>Тема</Form.Label>
                        <Form.Control placeholder="Введите тему" onChange={handleNameChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Время начала</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Время окончания</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleEndDateChange}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </Form.Group>

                    <Button className="m-1" variant="primary" type="submit" onClick={handleSaveBtnClick}>
                        Отправить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateEventModal;
