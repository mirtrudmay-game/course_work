import React, { Fragment } from "react";
import cn from "classnames";
import Select from "react-select";
//👇 generic type for select option
export type CustomSelectOption<T> = {
    label: string;
    value: T;
};
//👇 generic props
export type CustomSelect<T> = {
    options: CustomSelectOption<T>[];
    value: T;
    onChange(value: T): void;
};
//👇 generic select component
const CustomSelect = <T,>(props: CustomSelect<T>) => {
    const options = props.options;
    const selectedItem = options.find((o) => o.value === props.value);
    const label = selectedItem?.label ?? "Select Option...";

    return (
        <Select options={options}></Select>
);
};
export default CustomSelect;
