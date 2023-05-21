import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal} from "react-bootstrap";
import {ICreateBox, IOption} from "../../types/types";
import {modelsStore} from "../../store/ModelsStore";
import CreatableSelect from "react-select/creatable";
import {observer} from "mobx-react-lite";
import {SingleValue} from "react-select";
import {IModal} from "./IncreaseCoastModal";
import {boxesStore} from "../../store/BoxesStore";


interface ICreateBoxError {
    boxNumber: string;
    model: string;
    dailyCoast: string;
}

const CreateBoxModal: FC<IModal> = ({show, closeCallback}) => {
    const initialData: ICreateBox = {
        boxNumber: '',
        model: {
            value: '',
            label: ''
        },
        dailyCoast: ''
    }

    const initialErrors: ICreateBoxError = {
        boxNumber: '',
        model: '',
        dailyCoast: ''
    }

    const [models, setModels] = useState<IOption[]>();
    const [data, setData] = useState<ICreateBox>(initialData);
    const [errors, setErrors] = useState<ICreateBoxError>(initialErrors);

    useEffect(() => {
        modelsStore.loadAll().then(() => {
            const options: IOption[] =
                modelsStore.modelsList.map((model): IOption => ({
                    value: model.id.toString(),
                    label: model.name
                }));

            setModels(options);
        });

    }, []);

    const onChangeValidate = (name: string, value: string | SingleValue<IOption>) => {
        if (["boxNumber", "dailyCoast"].includes(name)) {
            if (value && isNaN(+value)) return "Некорректное значение";
        }
        return '';
    }

    const onChange = (name: string, value: string | SingleValue<IOption>) => {
        const err = onChangeValidate(name, value);
        setErrors({...errors, [name]: err});

        if (name === "model" && typeof value === "string") {
            setData({
                ...data, model: {
                    value: '',
                    label: value
                }
            });
            return;
        }

        setData({...data, [name]: value});
    };

    const onClose = () => {
        setData(initialData);
        setErrors(initialErrors);
        closeCallback();
    }

    const isValid = () =>  {
        const _errors = Object.assign({}, errors);
        if (!data.boxNumber) _errors.boxNumber = "Введите значение";
        if (!data.model.label) _errors.model = "Введите значение";
        if (!data.dailyCoast) _errors.dailyCoast = "Введите значение";

        setErrors(_errors);
        return !Object.values(_errors).filter((v) => v).length;
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isValid()) {
            await boxesStore.saveNewBox(data)
            onClose();
        }
    }


    const modelCustomStyles = {
        // @ts-ignore
        control: (base, state) => ({
            ...base,
            borderColor: errors.model ? '#dc3545': '#ddd',
            '&:hover': {
                borderColor: state.isFocused ? '#ddd'
                    : errors.model ? '#dc3545': '#ddd'
            }
        })
    }


    return (
        <Modal show={show} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить бокс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                        <FormLabel className="required">Номер бокса</FormLabel>
                        <FormControl
                            name="boxNumber"
                            value={data.boxNumber}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                            isInvalid={!!errors.boxNumber}
                            type="text"
                            autoComplete={"off"}
                        />
                        <FormControl.Feedback type="invalid">{errors.boxNumber}</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel className="required">Модель</FormLabel>
                        <CreatableSelect
                            styles={modelCustomStyles}
                            isClearable
                            onChange={(newValue) => onChange("model", newValue)}
                            onCreateOption={(newValue) => onChange("model", newValue)}
                            value={data.model}
                            options={models}
                        />
                        {errors.model && <div style={{color: "#dc3545", fontSize: ".875em", marginTop: "5px"}}>{errors.model}</div>}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel className="required">Стоимость (руб/сутки) </FormLabel>
                        <FormControl
                            name={"dailyCoast"}
                            value={data.dailyCoast}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                            isInvalid={!!errors.dailyCoast}
                            type="text"
                            autoComplete={"off"}/>
                        <FormControl.Feedback type="invalid">{errors.dailyCoast}</FormControl.Feedback>
                    </FormGroup>
                    <Button type="submit" className={"me-2"}>Отправить</Button>
                    <Button type="reset" variant={"secondary"} onClick={onClose}>Отмена</Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
};

export default observer(CreateBoxModal);