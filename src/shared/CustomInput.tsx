import { TextField } from '@material-ui/core';
import * as React from "react";

type Props = {
    id: string
    label: string
    disabled?: boolean
    name: string
    required?: boolean
    style?: any
    inputType: string
    variant?: "standard" | "filled" | "outlined"
    placeholder?: string
    onChange: (attribute: string, value: string, invalid?: boolean, valid?: boolean) => void
    value?: any
    inputProps?: any
    type?: any
    mask?: string
    maxLength: number
}


function CustomInput(props: Props) {

    const {
        id,
        label,
        disabled,
        name,
        placeholder,
        value,
        type,
        inputProps,
        required,
        style
    } = props

    function applyMask(val: string) {
        const { inputType } = props
        switch (inputType) {
            case "all":
                return val.replace(/\s\s+/gi, " ")
            case "letter":
                return val.replace(/[^a-zA-Z\u00C0-\u00FF ]/gi, "").replace(/\s\s+/gi, " ")
            case "number":
                return val.replace(/[^0-9]/gi, "").replace(/\s\s+/gi, " ")
            default:
                return val.replace(/\s\s+/gi, " ")
        }
    }

    function onChangeInternal(ev: React.ChangeEvent<HTMLInputElement>) {
        const { maxLength } = props
        const val = ev.target.value
        const attribute = ev.target.name
        if (maxLength) {
            if (val.length <= maxLength) {
                const mask = applyMask(val)
                props.onChange(attribute, mask)
            }
        }
    }

    return (
        <>
            <TextField
                onChange={onChangeInternal}
                value={value || ""}
                style={
                    style ? { width: "97%", textAlign: "center", ...style } : { width: "97%", textAlign: "center" }
                }
                InputProps={{ inputProps }}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                label={label}
                disabled={disabled}
                required={required}
                id={id}
                margin="normal"
                name={name}
                type={type}
                fullWidth
                placeholder={placeholder}
            />
        </>
    )

}

export default CustomInput
