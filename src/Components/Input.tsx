import React, { ChangeEvent, KeyboardEvent } from "react"

type InputProps = {
    name: string,
    placeholder?: string,
    value?: string,
    type?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    className?: string,
    onKeyDown?: (e: KeyboardEvent) => void,
    disabled?: boolean
}

const Input = ({
    name,
    placeholder,
    value,
    type = "text",
    onChange,
    className,
    onKeyDown,
    disabled
}: InputProps) => {
    return (
        <input
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            className={`flex-1 placeholder-gray-300 px-3 py-1 bg-transparent border-2 border-gray-300 rounded-full ${className}`}
            onKeyDown={onKeyDown}
            placeholder={placeholder ? placeholder : 'Enter ' + name}
            disabled={disabled}
        />
    )
}

export default Input