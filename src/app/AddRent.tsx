import {Button, Container, Form, Modal} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import * as React from "react";
import {useDebugValue, useEffect, useState} from "react";
import {getOptions, Car, Renter, IOption, getOption, CarInput, RenterInput, Box} from "../types/types";
import {clientsStore} from "../store/ClientsStore";
import {modelsStore} from "../store/ModelsStore";
import Select, {OnChangeValue} from 'react-select'
import InputMask from "react-input-mask";
import Table from "../containers/boxes/Table";
import {boxTableColumns} from "../data/data";
import {boxesStore} from "../store/BoxesStore";
import boxes from "../containers/boxes/Boxes";
import {observer} from "mobx-react-lite";
import {Formik} from "formik";

const initialCarData: CarInput = {
    carNumber: null,
    renter: null,
    box: null,
    model: null,
    rentalStartDate: new Date()
}

const initialRenterData: RenterInput = {
    idRenter:null,
    fullName: null,
    address: null,
    phone: null,
    receiptNumber: null
}

function SelectBoxModal() {
    const [selectedRow, setSelectedBox] = useState<Box>();
    function selectRowHandler(value: Box) {
        setSelectedBox(value);
    }

    function createRent() {

    }

    return (
        <Modal size={"xl"} show={true}>
            <Modal.Header closeButton>Выбор бокса</Modal.Header>
            <Modal.Body>
                <Table<Box> columns={boxTableColumns} data={boxesStore.freeBoxesByCurrentModel} selectRowCallback={selectRowHandler} onlyOneValue={true}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={createRent}></Button>
            </Modal.Footer>

        </Modal>
    )
}

const AddRent = () => {
    const [car, setCar] = useState<CarInput>(initialCarData);
    const [renter, setRenter] = useState<RenterInput>(initialRenterData);
    const [isClientEditable, setClientEditable] = useState<boolean>(false);
    const [validated, setValidated] = useState(false);
    const [showFreeBoxes, setShowFreeBoxes] = useState(false);


    useEffect(() => {
        console.log(boxesStore.freeBoxesByCurrentModel)
    }, [boxesStore.freeBoxesByCurrentModel])

    async function handleSubmit (event:  React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event?.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if (car.model) {
            await boxesStore.loadFreeByModelId(car.model.id);
            setShowFreeBoxes(true);
        }

        setValidated(true);
    }

    function createRenterHandler(inputValue: string) {
        setRenter({...initialRenterData, fullName: inputValue});
        setClientEditable(true);
    }

    function selectRenterHandler(newValue: OnChangeValue<IOption, false>) {
        const renterData = clientsStore.getById(newValue?.value);
        setRenter(renterData || initialRenterData);
        setCar({...car, renter: renterData});
    }

    function selectModelHandler(newValue: OnChangeValue<IOption, false> | null) {
        const model = modelsStore.getById(newValue?.value);
        setCar({...car, model: model});
    }

    function renterPropertyChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setRenter({...renter, [name]: value})
    }

    function createRent() {

    }

    return (
        <Container>
            <Formik>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Клиент</Form.Label>
                        <CreatableSelect
                            isClearable
                            name="renter"
                            value={getOption(renter, "idRenter", "fullName")}
                            placeholder={"ФИО клиента"}
                            onChange={(newValue) => selectRenterHandler(newValue)}
                            onCreateOption={createRenterHandler}
                            options={getOptions(clientsStore.clientsList, "idRenter", "fullName")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Телефон</Form.Label>
                        <InputMask className="form-control"
                                   mask="+9(999) 999-9999"
                                   name={"phone"}
                                   readOnly={!isClientEditable}
                                   value={renter.phone || ""}
                                   onChange={renterPropertyChangeHandler}
                        />

                        <Form.Control.Feedback type="invalid">Некорректное значение.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            name="address"
                            readOnly={!isClientEditable}
                            onChange={renterPropertyChangeHandler}
                            value={renter.address || ""}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Модель</Form.Label>
                        <Select
                            name="renter"
                            value={getOption(car.model, "id", "name")}
                            placeholder={"Название модели"}
                            onChange={(newValue) => selectModelHandler(newValue)}
                            options={getOptions(modelsStore.modelsList, "id", "name")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Номер машины</Form.Label>
                        <Form.Control
                            name="carNumber"
                            value={renter.address || ""}
                            type="text"
                        />
                    </Form.Group>


                    <Button variant="warning" type="submit" className={"mb-3"}>
                        Подобрать бокс
                    </Button>

                </Form>
            </Formik>

            {showFreeBoxes && <SelectBoxModal />}
        </Container>
    );
}

export default observer(AddRent);