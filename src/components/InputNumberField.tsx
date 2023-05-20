import React, {FC} from 'react';
import {FormikProps, Field} from 'formik';
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

interface IFormikComponent {
    handleChange: () => void;
    handleSubmit: () => void;
    handleBlur: () => void;
    value: string;
    errors.sequenceNumber, touched.sequenceNumber}} name={"sequenceNumber"}
    name: string;
}

const InputNumberField: FC<IFormikComponent> = ({props, name}) => (
    <Field name="username" render={() => (
        <FormGroup controlId="username">
            <FormLabel> Username</FormLabel>
            <FormControl
                type={'text'}
                value={props.values[name]}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                isInvalid={!!props.errors[name]}
                required
            />
            <FormControl.Feedback type="invalid">
                {/* @ts-ignore */}
                {props.touched[name] && props.errors[name]}
            </FormControl.Feedback>
        </FormGroup>
    )}></Field>
);

export default InputNumberField;