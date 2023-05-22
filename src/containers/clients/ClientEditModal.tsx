import * as React from 'react';
import {Button, ButtonToolbar, Form, InputGroup, Modal} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {IEditRenter, IOption, IRenter} from "../../types/types";
import {observer} from "mobx-react-lite";
import InputMask from "react-input-mask";
import {IModal} from "../boxes/IncreaseCostModal";
import {modelsStore} from "../../store/ModelsStore";
import {SingleValue} from "react-select";
import {boxesStore} from "../../store/BoxesStore";
import {clientsStore} from "../../store/ClientsStore";
import "./styles.less";
// @ts-ignore
import clsx from 'clsx';

export interface IEditModal<T> extends IModal{
    initialData: T;
}

interface IEditClientErrors {
    fullName: string;
    phone: string;
}

const ClientEditModal: FC<IEditModal<IEditRenter>> = ({closeCallback, show, initialData}) => {
    const [data, setData] = useState<IEditRenter>(initialData);
    const [errors, setErrors] = useState<IEditClientErrors>({
        fullName: '',
        phone: '',
    });

    function onHide() {
        closeCallback();
    }

    const onChange = (name: string, value: string) => {
        setData({...data, [name]: value});
    };

    const onBlur = (name: string, value: string) => {
        if (name === "phone") {
            if (!value || value.includes("_")) setErrors({...errors, [name]: "Некорректное значение"})
        }
    }

    const onFocus = (name: string, value: string) => {
        setErrors({...errors, [name]: ""})
    }

    const onSubmitValidate = () => {
        const _errors = Object.assign({}, errors);
        if (!data.fullName) _errors.fullName = "Введите значение";

        setErrors(_errors);
    };

    const isValid = () =>  {
        return !Object.values(errors).filter((v) => v).length;
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmitValidate();
        isValid() && clientsStore.updateSelectedClient(data);
    }

    const className = clsx(
        'form-control',
        { 'phone-control': !errors.phone },
        { 'phone-control-danger': errors.phone }
    );



    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование данных о клиенте</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="required">ФИО</Form.Label>
                        <Form.Control
                            name="fullName"
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                            value={data.fullName}
                            type="text"
                            autoComplete={"off"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="required" >Телефон</Form.Label>
                        <InputMask className={className}
                                   mask="+9(999) 999-9999"
                                   name={"phone"}
                                   value={data.phone}
                                   onChange={(e) => onChange(e.target.name, e.target.value)}
                                   onBlur={(e) => onBlur(e.target.name, e.target.value)}
                                   onFocus={(e) => onFocus(e.target.name, e.target.value)}
                                   required
                        />
                        {errors.phone && <div style={{color: "#dc3545", fontSize: ".875em", marginTop: "5px"}}>{errors.phone}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            name="address"
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                            value={data.address}
                            type="text"
                        />
                    </Form.Group>

                    <ButtonToolbar>
                        <Button className="me-3" type="submit">Отправить</Button>
                        <Button onClick={onHide} variant="secondary">Отменить</Button>
                    </ButtonToolbar>
                </Form>
            </Modal.Body>

        </Modal>
    );
};

export default observer(ClientEditModal);