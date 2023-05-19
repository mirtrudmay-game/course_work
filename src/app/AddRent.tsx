import {Button, Container, Modal, Form} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import * as React from "react";
import {useDebugValue, useEffect, useState} from "react";
import {getOptions, Car, Renter, IOption, getOption, CarInput, BoxTableView} from "../types/types";
import {clientsStore} from "../store/ClientsStore";
import {modelsStore} from "../store/ModelsStore";
import Select, {OnChangeValue} from 'react-select'
import InputMask from "react-input-mask";
import Table from "../containers/boxes/Table";
import {boxTableColumns} from "../data/data";
import {boxesStore} from "../store/BoxesStore";
import boxes from "../containers/boxes/Boxes";
import {observer} from "mobx-react-lite";


const initialRenterData: Renter = {
    idRenter: null,
    fullName: '',
    address: '',
    phone: '',
    receiptNumber: null
}

const initialCarData: CarInput = {
    carNumber: null,
    renter: initialRenterData,
    box: null,
    model: null,
    rentalStartDate: new Date()
}

function SelectBoxModal() {
    const [selectedRow, setSelectedBox] = useState<BoxTableView>();
    function selectRowHandler(value: BoxTableView) {
        setSelectedBox(value);
    }

    function createRent() {

    }

    return (
        <Modal size={"xl"} show={true}>
            <Modal.Header closeButton>Выбор бокса</Modal.Header>
            <Modal.Body>
                <Table<BoxTableView> columns={boxTableColumns} data={boxesStore.freeBoxesByCurrentModel} selectRowCallback={selectRowHandler} onlyOneValue={true}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={createRent}></Button>
            </Modal.Footer>

        </Modal>
    )
}

const AddRent = () => {
    const [car, setCar] = useState<CarInput>(initialCarData);
    const [isClientEditable, setClientEditable] = useState<boolean>(false);
    const [showFreeBoxes, setShowFreeBoxes] = useState(false);

    const [renterValidated, setRenterValidated] = useState(true);
    const [phoneValidate, setPhoneValidate] = useState(true);
    const [modelValidated, setModelValidated] = useState(true);
    const [carNumberValidate, setCarNumberValidate] = useState(true);


    async function handleSubmit (event:  React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (!car.renter.fullName) setRenterValidated(false);

        if (!car.model) setModelValidated(false);
        if (!car.carNumber) setCarNumberValidate(false);


        if (car.model) {
            await boxesStore.loadFreeByModelId(car.model.id);
            setShowFreeBoxes(true);
        }

    }

    function createRenterHandler(inputValue: string) {
        const renter: Renter = {...initialRenterData, fullName: inputValue}
        setCar({...car, renter: renter});
        setClientEditable(true);
    }

    function selectRenterHandler(newValue: OnChangeValue<IOption, false>) {
        const renterData = clientsStore.getById(newValue?.value);
        setCar({...car, renter: renterData || initialRenterData });
        setClientEditable(false);
    }

    function selectModelHandler(newValue: OnChangeValue<IOption, false> | null) {
        const model = modelsStore.getById(newValue?.value);
        setCar({...car, model: model});
    }

    function renterPropertyChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        const renter = {...car.renter, [name]: value}
        setCar({...car, renter})
    }

    function carPropertyChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setCar({...car, [name]: value})
    }

    const renterCustomStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: renterValidated ? '#ddd' : 'red',
            '&:hover': { borderColor: state.isFocused ? '#ddd'
                            : renterValidated ? '#ddd' : 'red'
            }
        })
    }

    const modelCustomStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: modelValidated ? '#ddd' : 'red',
            '&:hover': { borderColor: state.isFocused ? '#ddd'
                    : modelValidated ? '#ddd' : 'red'
            }
        })
    }

    function renterFocusHandler() {
        setRenterValidated(true);
    }

    function renterBlurHandler() {
        if (!car.renter.fullName) setRenterValidated(false);
    }

    function modelFocusHandler() {
        setModelValidated(true);
    }

    function modelBlurHandler() {
        debugger
        if (!car.model) setModelValidated(false);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Клиент</Form.Label>
                    <CreatableSelect
                        styles={ renterCustomStyles }
                        isClearable
                        name="renter"
                        value={getOption(car.renter, "idRenter", "fullName")}
                        placeholder={"ФИО клиента"}
                        onChange={selectRenterHandler}
                        onCreateOption={createRenterHandler}
                        options={getOptions(clientsStore.clientsList, "idRenter", "fullName")}
                        onFocus={renterFocusHandler}
                        onBlur={renterBlurHandler}
                    />
                    {!renterValidated && <div style={{color: "red"}}>Введите имя клиента</div>}
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Телефон</Form.Label>
                    <InputMask className="form-control"
                               mask="+7(999) 999-9999"
                               name={"phone"}
                               readOnly={!isClientEditable}
                               value={car.renter.phone || ""}
                               onChange={renterPropertyChangeHandler}
                    />
                    {!phoneValidate && <div style={{color: "red"}}>Введите номер телефона</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                        name="address"
                        readOnly={!isClientEditable}
                        onChange={renterPropertyChangeHandler}
                        value={car.renter?.address || ""}
                        type="text"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Модель</Form.Label>
                    <Select
                        styles = {modelCustomStyles}
                        name="renter"
                        value={getOption(car.model, "id", "name")}
                        placeholder={"Название модели"}
                        onChange={selectModelHandler}
                        options={getOptions(modelsStore.modelsList, "id", "name")}
                        onFocus={modelFocusHandler}
                        onBlur={modelBlurHandler}
                    />
                    {!modelValidated && <div style={{color: "red"}}>Введите название модели</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Номер машины</Form.Label>
                    <Form.Control
                        name="carNumber"
                        value={car.carNumber || ""}
                        type="text"
                        onChange={carPropertyChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">Введите номер машины</Form.Control.Feedback>
                </Form.Group>

                <Button variant="warning" type="submit" className={"mb-3"}>
                    Подобрать бокс
                </Button>
            </Form>

            {showFreeBoxes && <SelectBoxModal />}
        </Container>
    );
}

export default observer(AddRent);