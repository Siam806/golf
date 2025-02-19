import React from 'react'

export default function InputField({title, name, value, onChange}) {
    onChange = onChange || (() => {});

    return (
        <section className='flex flex-col items-center p-4' >
            <label className='text-center font-bold text-m'>{title}</label>
            <input type="number" name={name} className='w-[200px] h-[40px] text-lg p-3 text-white bg-gray-600 mt-3 rounded-xl caret-white' onChange={(e) => onChange(e.target.value)} value={value}/>
        </section>
    )
}
