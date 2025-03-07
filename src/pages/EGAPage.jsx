import React from 'react'
import EGAForm from '../components/EGA_Form'


export default function Home() {
    return (
        <>
            <h1 className="text-4xl font-extrabold mt-2 mb-2"  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>EGA System</h1>
            <EGAForm />
            
        </>
    )
}
