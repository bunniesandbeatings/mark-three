import React from 'react'

export const inputClasses = (...additional) => [
    "appearance-none",
    "block",
    "bg-gray-100",
    "text-gray-700",
    "border",
    "border-primary-500",
    "pt-4",
    "pb-1",
    "px-2",
    "leading-tight",
    "focus:bg-white",
    "w-full",
    "disabled:opacity-25",
    ...additional
].join(" ")

export const checkCellClasses = () => [
    "appearance-none",
    "relative",
    "bg-gray-100",
    "text-gray-700",
    "border",
    "border-primary-500",
    "leading-tight",
    "focus:bg-white",
    "align-middle",
].join(" ")

export const checkInputClasses = () => [
    "focus:bg-white",
    "form-checkbox",
    "h-4",
    "w-4",
    "mt-5",
    "ml-2",
    "text-secondary-600",
].join(" ")

export const Label = ({children, htmlFor}) => <label
    className="block absolute uppercase tracking-wide text-gray-500 text-xs font-bold h-4 px-2"
    htmlFor={htmlFor}>
    {children}
</label>


export const TextEntry = ({label, id, disabled, maxLength, value, onChange, pattern,placeholder = "", className}) =>
    <div className={className + " relative"}>
        <Label htmlFor={id}>{label}</Label>
        <input
            className={inputClasses()}
            id={id}
            type="text"
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            pattern={pattern}
            onChange={onChange}
            disabled={disabled}
        />
    </div>

export const NumericEntry = ({label, id, disabled, step = 1, max = 127, min = 0, value, onChange, className}) =>
    <div className={className + " relative"}>
        <Label htmlFor={id}>{label}</Label>
        <input
            className={inputClasses()}
            id={id}
            type="number"
            value={value}
            onChange={onChange}
            step={step}
            max={max}
            min={min}
            disabled={disabled}
        />
    </div>

export const SelectEntry = ({id, children, disabled, value, onChange, label = "", className}) =>
    <div className={className + " relative"}>
        <Label htmlFor={id}>{label}</Label>
        <select
            className={inputClasses()}
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 px-2 py-5 text-gray-900">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
        </div>
    </div>

export const CheckEntry = ({id, value, defaultValue, disabled, onChange, label = "", className = ""}) =>
    <div className={className + " " + checkCellClasses()}>
        <Label htmlFor={id}>{label}</Label>
        <input
            className={checkInputClasses()}
            id={id}
            type="checkbox"
            checked={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
        />
    </div>

export const EmptyEntry = ({className}) =>
    <div className={className + " relative"}>
        <div
            className={inputClasses() + " bg-gray-300"}
            type="text"
        >&nbsp;</div>
    </div>


export const CollectionOptions = (collection) => {
    return <>
        {
            collection.map(
                edgeType =>
                    <option key={edgeType.value} value={edgeType.value}>
                        {edgeType.name}
                    </option>)
        }
    </>
}
