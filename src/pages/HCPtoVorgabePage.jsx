import React from 'react'
import HCPtoVorgabe_Form from '../components/HCPtoVorgabe_Form'

export default function HCPtoVorgabePage() {
  return (
    <div>
        <h1 className="text-4xl font-extrabold mt-2 mb-2"  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>Spielvorgabe berechnen</h1>
        <HCPtoVorgabe_Form />
            
        
    </div>
  )
}