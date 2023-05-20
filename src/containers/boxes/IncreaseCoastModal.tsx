import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import * as React from "react";
import {FC, useState} from "react";
import {boxesStore} from "../../store/BoxesStore";

export interface IModal {
    closeCallback: () => void;
}

export const IncreaseCoastModal:FC<IModal> = ({ closeCallback})  => {
    const [coefficient, setCoefficient] = useState<number>(1);

    const onCoefficientChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoefficient(+event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await boxesStore.increaseCoast(coefficient);
        closeCallback();
    };


    return (
        <Modal show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>Увеличить стоимость</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Введите количество раз (можно дробное), в которое необходимо увеличить стоимость: </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.1"
                            min="1"
                            onChange={onCoefficientChangeHandler}
                            value={coefficient}
                        />
                    </Form.Group>
                    <Button type="submit">Отправить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}