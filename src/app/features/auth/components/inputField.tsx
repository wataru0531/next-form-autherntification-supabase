
// input

import React from 'react'
import { UseFormRegister } from 'react-hook-form'

interface InputFieldProps {
  label: string,
  name: string,
  type: string,
  placeholder?: string,
  register: UseFormRegister<any>,
}

function InputField({ label, name, type, placeholder, register }: InputFieldProps) {
  // console.log(register) //
  
  return (
    <div>
      <label 
        htmlFor={ name }
        className="mt-4 text-gray-700 text-sm font-bold mb-1 block"
      >
        { label }
      </label>
      <input 
        type={ type }
        id={ name }
        placeholder={ placeholder }
        className="border rounded w-full shadow py-3 px-4 text-gray-400 leading-tight focus:outline-none"
        // register(name属性の値、オプション) ... バリデーションを設定している
        { ...register(name, { required: "この項目は必須です。" }) }
      />
      
    </div>
  )
}

export default InputField

