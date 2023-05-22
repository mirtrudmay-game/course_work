import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal} from "react-bootstrap";
import {IOption} from "../../types/types";
import CreatableSelect from "react-select/creatable";
import {observer} from "mobx-react-lite";
import {SingleValue} from "react-select";
import {IModal} from "./IncreaseCostModal";
import {boxesStore} from "../../store/BoxesStore";
import {modelsStore} from "../../store/ModelsStore";

interface IBoxCreateError {
    box_number: string;
    model: string;
    daily_cost: string;
}

export interface IBoxCreateData {
    box_number: string;
    model: string | IOption | null;
    daily_cost: string;
}
const initialData: IBoxCreateData = {
    box_number: '',
    model: {
        value: '',
        label: ''
    },
    daily_cost: ''
}

const initialErrors: IBoxCreateError = {
    box_number: '',
    model: '',
    daily_cost: ''
}

const CreateBoxModal: FC<IModal> = ({show, closeCallback}) => {
    const [models, setModels] = useState<IOption[]>();
    const [data, setData] = useState<IBoxCreateData>(initialData);
    const [errors, setErrors] = useState<IBoxCreateError>(initialErrors);

    useEffect(() => {
        if (show) {
            const options: IOption[] =
                modelsStore.modelsList.map((model): IOption => ({
                    value: model.id_model.toString(),
                    label: model.name
                }));

            setModels(options);
        }
    }, [show, modelsStore.modelsList]);

    const onChangeValidate = (name: string, value: string | SingleValue<IOption>) => {
        if (["box_number", "daily_cost"].includes(name)) {
            setErrors({...errors, [name]: isNaN(+value!) ? "Некорректное значение" : ""});
        }
        return '';
    }

    const onChange = (name: string, value: string | SingleValue<IOption>) => {
        if (["daily_cost", "box_number"].includes(name)) {

        }
        // Для модели валидация не нужна.
        if (name === "model") {
            if (typeof value === "string") {
                setData({
                    ...data, model: {
                        value: '',
                        label: value
                    }
                });
                return;
            }

            setData({...data, model: value});
            setErrors({...errors, model: ""});
            return;
        }

        // Остальные поля - числовые.
        setData({...data, [name]: value});

        if ()  {

        } else {
            setErrors({...errors, [name]: ""});
        }
    };

    const close = () => {
        setData(initialData);
        setErrors(initialErrors);

        closeCallback();
    }

    const isValid = () =>  {
        debugger
        const _errors = Object.assign({}, errors);
        if (!data.box_number) _errors.box_number = "Введите значение";
        if (!data.model.label) _errors.model = "Введите значение";
        if (!data.daily_cost) _errors.daily_cost = "Введите значение";

        setErrors(_errors);
        return !Object.values(_errors).filter((v) => v).length;
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isValid()) {
            await boxesStore.saveNewBox(data)
            close();
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
                            name="box_number"
                            value={data.box_number}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                            isInvalid={!!errors.box_number}
                            type="text"
                            autoComplete={"off"}
                        />
                        <FormControl.Feedback type="invalid">{errors.box_number}</FormControl.Feedback>
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
                            name={"daily_cost"}
                            value={data.daily_cost}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                            isInvalid={!!errors.daily_cost}
                            type="text"
                            autoComplete={"off"}/>
                        <FormControl.Feedback type="invalid">{errors.daily_cost}</FormControl.Feedback>
                    </FormGroup>
                    <Button type="submit" className={"me-2"}>Отправить</Button>
                    <Button type="reset" variant={"secondary"} onClick={close}>Отмена</Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
};

export default observer(CreateBoxModal);