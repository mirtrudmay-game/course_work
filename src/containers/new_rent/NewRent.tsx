import * as React from "react";
import {useEffect, useState} from "react";
import {IOption} from "../../types/types";
import {Button, Container, Form, FormGroup, FormLabel} from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import InputMask from "react-input-mask";
import {useStores} from "../../store/RootStore";
import {SelectBoxModal} from "./SelectBoxModal";
import clsx from "clsx";

interface ICarCreateData {
    carNumber: string;
    renterName: IOption;
    renterPhone: string;
    renterAddress: string;
    renterReceiptNumber: string;
    model: IOption;
    rentalStartDate: string;
}

interface ICarCreateError {
    carNumber: string;
    renterName: string
    renterPhone: string;
    renterReceiptNumber: string;
    model: string;
    rentalStartDate: string;
}

const initialCarData: ICarCreateData = {
    carNumber: '',
    renterName: new IOption("", ""),
    renterPhone: '',
    renterAddress: '',
    renterReceiptNumber: '',
    model: new IOption('', ''),
    rentalStartDate: '',
}

const initialCarErrors: ICarCreateError  = {
    carNumber: '',
    renterName: '',
    renterPhone: '',
    renterReceiptNumber: '',
    model: '',
    rentalStartDate: '',
}

export const NewRent = () => {
    const { modelsStore, clientsStore} = useStores();

    const [models, setModels] = useState<IOption[]>([]);
    const [renters, setRenters] = useState<IOption[]>([]);

    const [data, setData] = useState<ICarCreateData>(initialCarData);
    const [errors, setErrors] = useState<ICarCreateError>(initialCarErrors);

    const [isClientEditable, setClientEditable] = useState<boolean>(false);
    const [showFreeBoxesModal, setShowFreeBoxesModal] = useState<boolean>(false);

    useEffect(() => {
        modelsStore.loadAll().then(() => {
            const modelsList = modelsStore.modelsList.map((model) => new IOption(model.id_model.toString(), model.name));
            setModels(modelsList);
        })

        clientsStore.loadAll().then(() => {
            const clientsList = clientsStore.clientsList.map((client) => new IOption(client.id_renter.toString(), client.full_name));
            setRenters(clientsList);
            console.log(clientsList)
        });

    }, [])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        /*const _errors = Object.assign({}, errors);
        if (!data.renterName) _errors.renterName = "Введите значение";
        if (!data.renterPhone) _errors.renterPhone = "Введите значение";
        // if (!data.renterReceiptNumber) _errors.renterReceiptNumber = "Введите значение";
        if (!data.model) _errors.model =

        setErrors(_errors);*/

        const _errors = Object.assign({}, errors);
        Object.keys(errors).forEach((key) => {
            // @ts-ignore
            if (!data[key]) _errors[key] = "Введите значение";
        });

        if (!Object.values(_errors).filter((v) => v).length) {
            setShowFreeBoxesModal(true);
        } else {
            setErrors(_errors);
        }
    }

    const modelCustomStyles = {
        // @ts-ignore
        control: (base, state) => ({
            ...base,
            borderColor: errors.model ? '#dc3545' : '#ddd',
            '&:hover': {
                borderColor: state.isFocused ? '#ddd'
                    : errors.model ? '#dc3545' : '#ddd'
            }
        })
    }

    const renterCustomStyles = {
        // @ts-ignore
        control: (base, state) => ({
            ...base,
            borderColor: errors.renterName ? '#dc3545' : '#ddd',
            '&:hover': {
                borderColor: state.isFocused ? '#ddd'
                    : errors.model ? '#dc3545' : '#ddd'
            }
        })
    }

    const onSelectRenter = (value: string | IOption | null) => {
        if (!value) {
            setData({
                ...data, renterName: new IOption('', ''), renterPhone: '', renterAddress: '', renterReceiptNumber: ''
            })
            setClientEditable(false);
            return;
        }

        setErrors({...errors, model: ''});

        if (typeof value === "string") {
            setData({
                ...data, renterName: new IOption('', value), renterPhone: '', renterAddress: '', renterReceiptNumber: ''
            })
            setClientEditable(true);
            return;
        }

        const renter = clientsStore.getById(value.value);
        setData({
            ...data, renterName: value, renterPhone: renter.phone, renterAddress: renter.address, renterReceiptNumber: renter.receipt_number.toString()
        });
        setClientEditable(false);
    }

    const onChangeSelect = (name: string, value: string | IOption | null) => {
        if (!value) {
            setData({
                ...data, [name]: {
                    value: '',
                    label: ''
                }
            })
            return;
        }

        setErrors({...errors, model: ''});

        if (typeof value === "string") {
            setData({
                ...data, [name]: {
                    value: '',
                    label: value
                }
            })
            return;
        }

        setData({
            ...data, [name]: value
        });
    }

    const onChange = (name: string, value: string) => {
        setData({...data, [name]: value});
    };

    const onBlurMaskedInput = (name: string, value: string) => {
        if (!value || value.includes("_")) setErrors({...errors, [name]: "Некорректное значение"})
    }

    const onFocusMaskedInput = (name: string, value: string) => {
        setErrors({...errors, [name]: ""})
    }

    const phoneClassName = clsx(
        'form-control',
        { 'phone-control': !errors.renterPhone },
        { 'phone-control-danger': errors.renterPhone }
    );

    const onCloseFreeBoxesModal = () => {
        setShowFreeBoxesModal(false);
    };

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <FormGroup className="mb-3">
                    <FormLabel className="required-p">Клиент</FormLabel>
                    <CreatableSelect
                        styles={renterCustomStyles}
                        isClearable
                        onChange={(newValue) => onSelectRenter(newValue)}
                        onCreateOption={(newValue) => onSelectRenter(newValue)}
                        value={data.renterName}
                        options={renters}
                    />
                    {errors?.renterName &&
                        <div style={{color: "#dc3545", fontSize: ".875em", marginTop: "5px"}}>{errors.renterName}</div>}
                </FormGroup>

                <Form.Group className="mb-3">
                    <Form.Label className="required-p" >Телефон</Form.Label>
                    <InputMask className={phoneClassName}
                               mask="+9(999) 999-9999"
                               name={"renterPhone"}
                               value={data.renterPhone}
                               onChange={(e) => onChange(e.target.name, e.target.value)}
                               onBlur={(e) => onBlurMaskedInput(e.target.name, e.target.value)}
                               onFocus={(e) => onFocusMaskedInput(e.target.name, e.target.value)}
                               required
                               readOnly={!isClientEditable}
                    />
                    {errors.renterPhone && <div style={{color: "#dc3545", fontSize: ".875em", marginTop: "5px"}}>{errors.renterPhone}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                        name="renterAddress"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                        value={data.renterAddress}
                        type="text"
                        readOnly={!isClientEditable}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="required-p">Модель</Form.Label>
                    <Select
                        styles={modelCustomStyles}
                        name="model"
                        value={data.model}
                        placeholder={"Название модели"}
                        onChange={(newValue) => onChangeSelect("model", newValue)}
                        options={models}
                    />
                    {errors.model && <div style={{color: "#dc3545", fontSize: ".875em", marginTop: "5px"}}>{errors.model}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="required-p">Номер машины</Form.Label>
                    <Form.Control
                        name="carNumber"
                        value={data.carNumber}
                        type="text"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">Введите номер машины</Form.Control.Feedback>
                </Form.Group>

                <Button variant="warning" type="submit" className={"mb-3"}>
                    Подобрать бокс
                </Button>
            </Form>

            {<SelectBoxModal show={showFreeBoxesModal} id={data.model.value} closeCallback={onCloseFreeBoxesModal}/>}
        </Container>
    );
}