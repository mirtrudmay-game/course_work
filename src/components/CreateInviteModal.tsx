import React, { ChangeEvent, FC, useState } from "react";
import { IGroupDataCreate, IIntervalData } from "../types/types";
import { eventsStore } from "../store/EventsStore";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { IntervalEditor } from "./IntervalEditor";

interface ICreateInviteModal {
    isShow: boolean;
    onHide: () => void;
}

export const Interval: FC<IIntervalData> = (interval) => (
    <Badge bg="light" text="secondary">
        {interval.start.toLocaleString("ru")} - {interval.end.toLocaleString("ru")}
    </Badge>
);

export const CreateInviteModal: FC<ICreateInviteModal> = ({ isShow, onHide }) => {
    const [name, setName] = useState<string>("");
    const [intervalsList, setIntervalsList] = useState<IIntervalData[]>([]);
    const [isShowEditor, setShowEditor] = useState<boolean>(false);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSaveBtnClick = () => {
        const invitation: IGroupDataCreate = {
            name: name,
            intervals: intervalsList,
            note: "",
        };

        eventsStore.saveInvite(invitation).catch(console.error);
    };

    const createInterval = () => {
        const start = new Date();
        const end = new Date();

        const interval: IIntervalData = {
            start: start,
            end: end,
        };
        setIntervalsList([...intervalsList, interval]);
    };

    const addIntervalClickHandler = () => {
        setShowEditor(true);
    };

    const cancelIntervalEditorHandler = () => {
        setShowEditor(false);
    };
    const _onHide = () => {
        setName("");
        setIntervalsList([]);
        setShowEditor(false);
        onHide();
    };

    return (
        <Modal size="xl" show={isShow} onHide={_onHide} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Новое приглашение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Тема</Form.Label>
                        <Form.Control placeholder="Введите тему" onChange={handleNameChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Интервалы</Form.Label>
                        <div
                            style={{
                                minHeight: "45px",
                                padding: "5px",
                                border: "1px solid #ced4da",
                                borderRadius: "5px",
                            }}
                        >
                            {intervalsList.map((interval) => (
                                <Interval start={interval.start} end={interval.end} />
                            ))}
                        </div>
                    </Form.Group>

                    {isShowEditor && (
                        <IntervalEditor
                            onCancelHandler={cancelIntervalEditorHandler}
                            onSubmitHandler={createInterval}
                        />
                    )}
                    {!isShowEditor && (
                        <Button className="mt-2 mb-2 col-3" onClick={addIntervalClickHandler}>
                            Добавить интервал
                        </Button>
                    )}

                    <Row>
                        <Col sm={{ span: 3, offset: 9 }}>
                            <Button className="w-100" onClick={handleSaveBtnClick}>
                                Отправить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateInviteModal;
