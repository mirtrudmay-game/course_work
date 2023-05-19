import * as React from 'react';
import {Button, ButtonToolbar, Form, InputGroup, Modal} from "react-bootstrap";
import {FC, useState} from "react";
import {Renter} from "../../types/types";
import {observer} from "mobx-react-lite";
import InputMask from "react-input-mask";

interface IClientEditModal {
    closeCallback: () => void;
    initialData: Renter;
}

const ClientEditModal: FC<IClientEditModal> = ({closeCallback, initialData}) => {
    const [data, setData] = useState<Renter>(initialData);

    function onHide() {
        closeCallback();
    }

    function formChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setData({...data, [name]: value})
    }

    function phoneBlurHandler() {
        if (data.phone.includes('_')) setPhoneValidate(false);
    }

    function phoneFocusHandler() {
        setPhoneValidate(true);
    }

    const phoneCustomStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: phoneValidate ? '#ddd' : 'red',
            '&:hover': {
                borderColor: state.isFocused ? '#ddd'
                    : phoneValidate ? '#ddd' : 'red'
            }
        })
    }

    const [phoneValidate, setPhoneValidate] = useState(true);


    return (
        <Modal show onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование данных о клиенте</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            name="fullName"
                            onChange={formChangeHandler}
                            value={data.fullName}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Телефон</Form.Label>
                        <InputMask className="form-control"
                                   styles={phoneCustomStyles}
                                   mask="+9(999) 999-9999"
                                   name={"phone"}
                                   value={data.phone}
                                   onChange={formChangeHandler}
                                   onBlur={phoneBlurHandler}
                                   onFocus={phoneFocusHandler}
                        />

                        {!phoneValidate && <div style={{color: "red"}}>Некорректное значение</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            name="address"
                            onChange={formChangeHandler}
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