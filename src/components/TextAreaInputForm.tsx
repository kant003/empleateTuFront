import React from 'react'
interface InputFormProps {
    text: string
    name: string
    value?: string
    checked?: boolean
    placeholder?: string
    type?: string
    rows?: number
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    error: string | undefined
    }
function TextAreaInputForm({text, name, value, handleChange, error, placeholder='', rows=5}: InputFormProps) {
  return (
    <div className="mb-5">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {text}
        </label>
        <textarea
          value={value}
          onChange={handleChange}
          name={name}
          rows={rows}
          id={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {error}</p> }

      </div>

  )
}

export default TextAreaInputForm