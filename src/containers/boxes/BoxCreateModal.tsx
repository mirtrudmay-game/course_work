// @flow
import * as React from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {models} from "../../data/data";
import {store} from "../../store/Store";
import {ICreateBox, IModel} from "../../types/types";


interface IBoxCreateModal {
    show: boolean;
}

export const BoxCreateModal: FC<IBoxCreateModal> = ({show}) => {
    useEffect(() => {
        store.loadAllModels().catch();
    }, []);

    const [boxNumber, setBoxNumber] = useState<string>("");
    const [modelName, setModelName] = useState<string>(models[0].name);
    const [dailyCoast, setDailyCoast] = useState<string>("");

    const [boxNumberValid, setBoxNumberValid] = useState<boolean>(true);
    const [dailyCoastValid, setDailyCoastValid] = useState<boolean>(true);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!boxNumber) setBoxNumberValid(false);
        if (!dailyCoast) setDailyCoastValid(false);

        const model: IModel = models.filter((m) => m.name == modelName)[0];

        if (!boxNumberValid || !dailyCoastValid || !model) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const box: ICreateBox = {
            sequenceNumber: +boxNumber,
            model: model,
            dailyCoast: +dailyCoast
        }
        store.addBox(box);
    };

    function changeNumberHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const v = e.target.value;
        setBoxNumber(v);

        isNaN(+v) ? setBoxNumberValid(false) : setBoxNumberValid(true);
    }

    function changeCoastHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const v = e.target.value;
        setDailyCoast(v);

        isNaN(+v) ? setDailyCoastValid(false) : setDailyCoastValid(true);
    }

    function selectModelHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        setModelName(e.target.value);
    }

    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить бокс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Номер бокса</Form.Label>
                        <Form.Control
                            onChange={changeNumberHandler}
                            value={boxNumber}
                            isInvalid={!boxNumberValid}
                            type="text"
                        />
                        <Form.Control.Feedback type="invalid">Некорректный номер бокса.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Модель</Form.Label>
                        <InputGroup>
                            <Form.Select onSelect={selectModelHandler} value={modelName}>
                                {models.map(model => (
                                    <option>{model.name}</option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Стоимость (руб/сутки): </Form.Label>
                        <Form.Control isInvalid={!dailyCoastValid} value={dailyCoast} type="text" onChange={changeCoastHandler}/>
                        <Form.Control.Feedback type="invalid">Некорректное значение.</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit">Отправить</Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
};