import React from 'react'

export default function InputField({title, value, onChange}) {
    return (
        <section className='flex flex-col w-[200px] p-4' >
            <label className='text-center font-extrabold text-xl'>{title}</label>
            <input type="number" className='p-3 text-white bg-gray-600 mt-3 h-[40px] rounded-xl caret-white' onChange={(e) => onChange(e.target.value)} value={value}/>
        </section>
    )
}
