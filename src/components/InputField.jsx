import React from 'react'

export default function InputField({ title, placeholder, value, onChange }) {
    return (
        // <section className='flex flex-col w-[200px] p-4' >
        <section >
            {/* <label className='text-center font-extrabold text-xl'>{title}</label>
            <input type="number" className='p-3 text-white bg-gray-600 mt-3 h-[40px] rounded-xl caret-white' onChange={(e) => onChange(e.target.value)} value={value}/> */}


            {title && <label className="block font-semibold">{title}</label>}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-64 p-3 border rounded bg-gray-100 text-black"
            />

        </section>
    )
}
