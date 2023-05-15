import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {models} from "../../data/data";
import * as React from "react";
import {FC, useState} from "react";
import {boxesStore} from "../../store/BoxesStore";

interface IIncreaseCoastModal {
    closeCallback: () => void;
    show: boolean;
}

export const IncreaseCoastModal:FC<IIncreaseCoastModal> = ({ closeCallback, show})  => {
    const [coef, setCoef] = useState<number>(1);

    const onCoefChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoef(+event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        boxesStore.increaseCoast(coef);
    };


    return (
        <Modal show={show} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>Увеличить стоимость</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Введите количество раз (можно дробное), в которое необходимо увеличить стоимость: </Form.Label>
                        <Form.Control
                            required
                            type="number"
                            step="0.1"
                            min="1"
                            onChange={onCoefChangeHandler}
                        />
                    </Form.Group>


                    <Button type="submit">Отправить</Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}