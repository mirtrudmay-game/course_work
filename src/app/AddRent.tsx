import {Button, Container, Form} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import * as React from "react";
import {useState} from "react";
import {ICar, IClient, IModel, IOption} from "../types/types";
import {clientsStore} from "../store/ClientsStore";
import {modelsStore} from "../store/ModelsStore";
import Select, {OnChangeValue} from 'react-select'
import InputMask from "react-input-mask";

const getClientOptions = (clients: IClient[]): IOption[] => {
    return clients.map((c) => ({"value": c.idRenter.toString(), "label": c.fullName} as IOption))
}

const getModelOptions = (models: IModel[]): IOption[] => {
    return models.map((c) => ({"value": c.id.toString(), "label": c.name} as IOption))
}

export function AddRent() {
    const [car, setCar] = useState<Partial<ICar>>({});
    const [isClientSelected, setClientSelected] = useState<boolean>(false);

    function formChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setCar({...car, [name]: value})
    }

    function createClientHandle() {
    }

/*    function setRenter(newValue: OnChangeValue<IOption, false>) {
        if (!newValue) {
            setCar({...car, renter: undefined});
            return;
        }

        setClientSelected(true);
        setCar({...car, renter: clientsStore.clientsList.find((c) => c.idRenter === +newValue.value)})
    }

    function setModel(newValue: OnChangeValue<IOption, false>) {
        if (!newValue) {
            setCar({...car, model: undefined});
            return;
        }

        setCar({...car, model: modelsStore.modelsList.find((m) => m.id === +newValue.value)})
    }*/

    function changeHandler(newValue: OnChangeValue<IOption, false>, fieldName: string) {
        setCar({...car, [fieldName]: newValue})
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Клиент</Form.Label>
                    <CreatableSelect
                        name="renter"
                        placeholder={"ФИО клиента"}
                        onChange={(newValue) => changeHandler(newValue, "renter")}
                        onCreateOption={createClientHandle}
                        options={getClientOptions(clientsStore.clientsList)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Телефон</Form.Label>
                    <InputMask className="form-control"
                               mask="+9(999) 999-9999"
                               name={"phone"}
                               readOnly={!isClientSelected}
                               value={car.phone}
                               onChange={formChangeHandler}
                    />

                    <Form.Control.Feedback type="invalid">Некорректное значение.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                        name="address"
                        readOnly={!isClientSelected}
                        onChange={formChangeHandler}
                        value={car.address}
                        type="text"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Модель</Form.Label>
                    <Select
                        name="renter"
                        placeholder={"Название модели"}
                        onChange={(newValue) => changeHandler(newValue, "model")}
                        options={getModelOptions(modelsStore.modelsList)}
                    />
                </Form.Group>

                <Button variant="warning">
                    Подобрать бокс
                </Button>
            </Form>
        </Container>
    );
}