// @flow
import * as React from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {boxesStore} from "../../store/BoxesStore";
import {IBoxView, IModel} from "../../types/types";
import {modelsStore} from "../../store/ModelsStore";
import CreatableSelect from "react-select/creatable";
import {observer} from "mobx-react-lite";


interface IBoxCreateModal {
    show: boolean;
    closeCallback: () => void;
}

export const NEW_MODEL = "-1";

interface IOption {
    value: string;
    label: string;
}

const getOptions = (models: IModel[]): IOption[] => {
    return models.map((m) => ({"value": m.id.toString(), "label": m.name} as IOption))
}

const BoxCreateModal: FC<IBoxCreateModal> = ({show, closeCallback}) => {

    useEffect(() => {
        modelsStore.loadAll();
    }, []);

/*    const [data, setData] = useState({
        sequenceNumber: "",
        model: modelsStore.modelsList[0],
        dailyCoast: ""
    })*/

    const [boxNumber, setBoxNumber] = useState<string>("");
    const [model, setModel] = useState<IOption | null>(null);
    const [dailyCoast, setDailyCoast] = useState<string>("");

    const [boxNumberValid, setBoxNumberValid] = useState<boolean>(true);
    const [dailyCoastValid, setDailyCoastValid] = useState<boolean>(true);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        if (!boxNumber) setBoxNumberValid(false);
        if (!dailyCoast) setDailyCoastValid(false);

        if (boxNumberValid && dailyCoastValid && model) {
            boxesStore.saveNewBox({
                sequenceNumber: +boxNumber,
                model: {id: +model.value, name: model.label},
                dailyCoast: +dailyCoast
            });
        }
    }

    function changeNumberHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const v = e.target.value;
        setBoxNumber(v);
        setBoxNumberValid(!isNaN(+v));
    }

    function changeCoastHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const v = e.target.value;
        setDailyCoast(v);
        setDailyCoastValid(!isNaN(+v));
    }

    const handleCreate = (value: string) => {
        setModel({value: NEW_MODEL, label: value});
    }

    return (
        <Modal show={show} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить бокс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Номер бокса</Form.Label>
                        <Form.Control
                            name="sequenceNumber"
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
                            <CreatableSelect
                                isClearable
                                onChange={(newValue) => setModel(newValue)}
                                onCreateOption={handleCreate}
                                value={model}
                                options={getOptions(modelsStore.modelsList)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Стоимость (руб/сутки): </Form.Label>
                        <Form.Control
                            name={"dailyCoast"}
                            isInvalid={!dailyCoastValid}
                            value={dailyCoast}
                            type="text"
                            onChange={changeCoastHandler}/>
                        <Form.Control.Feedback type="invalid">Некорректное значение.</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit">Отправить</Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
};

export default observer(BoxCreateModal);