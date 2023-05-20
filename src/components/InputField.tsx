// @flow
import * as React from 'react';
import {FormGroup, FormLabel} from "react-bootstrap";
import {FC, useState} from "react";
import {observer} from "mobx-react-lite";

interface InputField {
    name: string;
    label: string;
};

const InputField:FC<InputField> = ({name, label}) => {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>

        </FormGroup>
    );
};

export default observer(InputField);