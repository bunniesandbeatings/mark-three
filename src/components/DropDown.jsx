import React from "react"

export const DropDown = ({children, onChange, value}) => {
    return (
        <div className="relative">
            <select
                className="dropdown dropdown-default focus:outline-white focus:bg-white"
                onChange={onChange}
                value={value}
            >
                {children}
            </select>
            <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    )
}

export default DropDown