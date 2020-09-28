import React from 'react'

export const inputClasses = (...additional) => [
    "appearance-none",
    "block",
    "bg-gray-100",
    "text-gray-700",
    "border",
    "border-primary-500",
    "rounded",
    "py-1",
    "px-2",
    "leading-tight",
    "focus:bg-white",
    "w-full",
    ...additional
].join(" ")

export const checkInputClasses = () => [
    "border-primary-500",
    "rounded",
    "focus:bg-white",
    "form-checkbox",
    "h-5",
    "w-5",
    "mt-1",
    "text-indigo-600",
    "transition",
    "duration-150",
    "ease-in-out",
].join(" ")

export const Label = ({children}) => <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold h-4"
                                     htmlFor="grid-first-name">
    {children}
</label>

export const TextEntry = ({label, id, maxLength, value, onChange, pattern, placeholder = "", className}) =>
    <div className={className}>
        <Label>{label}</Label>
        <input
            className={inputClasses()}
            id={id}
            type="text"
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            pattern={pattern}
            onChange={onChange}
        />
    </div>

export const NumericEntry = ({label, id, step = 1, max = 127, min = 0, value, onChange, defaultValue = 0, className}) =>
    <div className={className}>
        <Label>{label}</Label>
        <input
            className={inputClasses()}
            id={id}
            type="number"
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            step={step}
            max={max}
            min={min}
        />
    </div>

export const SelectEntry = ({id, children, value, onChange, label = "", className}) =>
    <div className={className}>
        <Label>{label}</Label>
        <div className="relative">
            <select
                className={inputClasses()}
                id={id}
                value={value}
                onChange={onChange}
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    </div>

export const CheckEntry = ({id, value, defaultValue, onChange, label = "", className = ""}) =>
    <div className={className + " align-middle text-center"}>
        <Label>{label}</Label>
        <input
            className={checkInputClasses()}
            id={id}
            type="checkbox"
            checked={value}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    </div>

export const CollectionOptions = (collection) => {
    return <>
        {
            collection.map(
                edgeType =>
                    <option key={edgeType.type} value={edgeType.type}>
                        {edgeType.name}
                    </option>)
        }
        </>
}
