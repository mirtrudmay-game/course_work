// @flow
import * as React from 'react';
import {CSSProperties, FC, useEffect, useState} from 'react';
import {Button, FormControl, FormGroup, FormLabel, FormSelect, Modal} from "react-bootstrap";
import {boxesStore} from "../../store/BoxesStore";
import {getOptions, Model, IOption} from "../../types/types";
import {modelsStore} from "../../store/ModelsStore";
import CreatableSelect from "react-select/creatable";
import {observer} from "mobx-react-lite";
import Select, {SingleValue} from "react-select";
import {IModal} from "./IncreaseCoastModal";
import {ErrorMessage, Form, Field, Formik, FormikValues} from "formik";
import InputNumberField from "../../components/InputNumberField";
import FormikSelect from "../../components/FormikSelect";

interface CreateBoxValues {
    sequenceNumber: string;
    model: string;
    dailyCoast: string;
}

interface CreateBoxErrors {
    sequenceNumber: string;
    model: string;
    dailyCoast: string;
}


const NewBoxModal: FC<IModal> = ({closeCallback}) => {
    const [modelOptions, setModelOptions] = useState<IOption[]>();

    const loadModels = async () => {
        await modelsStore.loadAll();
        const models: Model[] = modelsStore.modelsList;
        const options: IOption[] = models.map((model): IOption => ({
            value: model.id.toString(),
            label: model.name
        }));
        setModelOptions(options);
    }

    useEffect(() => {
        loadModels();
    }, []);



/*    const modelCustomStyles = {
        // @ts-ignore
        control: (base, state) => ({
            ...base,
            borderColor: modelValid ? '#ddd' : '#dc3545',
            '&:hover': {
                borderColor: state.isFocused ? '#ddd'
                    : modelValid ? '#ddd' : '#dc3545'
            }
        })
    }*/

    const initialState: CreateBoxValues = {dailyCoast: '', model: '', sequenceNumber: ''}
    const validate = (values: FormikValues) => {
        const errors = {};

        if (!values.sequenceNumber) {
            errors.sequenceNumber = 'Введите номер бокса';
        }
        if (!values.model) {
            errors.model = 'First Name is required';
        }
        if (!values.dailyCoast) {
            errors.dailyCoast = 'Введите стоимость аренды';
        }
        return errors;
    }

    const onSubmit = (values: FormikValues) => {
        /*await boxesStore.saveNewBox({
            sequenceNumber: values.sequenceNumber,
            model: {id: +model!.value, name: model!.label},
            dailyCoast: +dailyCoast
        });*/
        closeCallback();
    }

    return (
        <Modal show={true} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить бокс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialState}
                    validate={validate}
                    onSubmit={values => {
                        if (values.sequenceNumber && values.model && values.dailyCoast) {
                            console.log('form submitted!!')
                        }
                    }}>

                    {({handleChange, handleSubmit, handleBlur, values, errors, touched}) => (
                       <Form onSubmit={handleSubmit}>
                            <Field name="sequenceNumber" >
                                {() => (
                                    <FormGroup className={"mb-3"}  controlId="sequenceNumber">
                                        <FormLabel> Номер бокса</FormLabel>
                                        <FormControl
                                            type={'text'}
                                            value={values.sequenceNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!(errors.sequenceNumber && touched.sequenceNumber)}
                                            required
                                        />
                                        <FormControl.Feedback type="invalid">
                                            {touched.sequenceNumber && errors.sequenceNumber}
                                        </FormControl.Feedback>
                                    </FormGroup>
                                )}
                            </Field>

                           <Field name="model">
                               {() => (
                                   <FormGroup className={"mb-3"} controlId="model">
                                       <FormLabel>Модель</FormLabel>
                                       <FormSelect value={values.model}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   isInvalid={!!(errors.model && touched.model)}
                                                   required>

                                           {modelOptions?.map((option) => (
                                               <option>{option.label}</option>
                                           ))}
                                       </FormSelect>

                                       <FormControl.Feedback type="invalid">
                                           {touched.model && errors.model}
                                       </FormControl.Feedback>
                                   </FormGroup>
                               )}
                           </Field>

                           <Field name="dailyCoast" render={() => (
                               <FormGroup className={"mb-3"} controlId="dailyCoast">
                                   <FormLabel>Стоимость ареды (руб / сутки)</FormLabel>
                                   <FormControl
                                       type={'text'}
                                       value={values.dailyCoast}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       isInvalid={!!(errors.dailyCoast && touched.dailyCoast)}
                                       required
                                   />
                                   <FormControl.Feedback type="invalid">
                                       {touched.dailyCoast && errors.dailyCoast}
                                   </FormControl.Feedback>
                               </FormGroup>
                           )}></Field>
                            <Button type="submit">
                                Отправить
                            </Button>
                        </Form>
                    )}
                </Formik>


                {/* <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Номер бокса</Form.Label>
                        <Form.Control
                            name="sequenceNumber"
                            onChange={changeNumberHandler}
                            value={boxNumber}
                            isInvalid={!boxNumberValid}
                            type="text"
                            autoComplete={"off"}
                        />
                        <Form.Control.Feedback type="invalid">Некорректный номер бокса.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Модель</Form.Label>
                        <CreatableSelect
                            styles={modelCustomStyles}
                            isClearable
                            onChange={(newValue) => changeModelHandler(newValue)}
                            onCreateOption={handleCreate}
                            value={model}
                            options={getOptions(modelsStore.modelsList, "id", "name")}
                        />
                        {!modelValid &&
                            <div style={{color: "#dc3545", fontSize: ".875em"}}>Введите название модели</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Стоимость (руб/сутки): </Form.Label>
                        <Form.Control
                            name={"dailyCoast"}
                            isInvalid={!dailyCoastValid}
                            value={dailyCoast}
                            type="text"
                            onChange={changeCoastHandler}/>
                        <Form.Control.Feedback type="invalid">Некорректное значение.</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit">Отправить</Button>
                </Form>*/}
            </Modal.Body>

        </Modal>
    );
};

export default observer(NewBoxModal);