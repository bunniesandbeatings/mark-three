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