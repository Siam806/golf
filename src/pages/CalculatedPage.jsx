import React from 'react'
import { Link } from 'react-router-dom'

export default function CalculatedPage() {
    const result = window.history.state.usr;


    return (
        <>
            <div className='flex flex-row justify-evenly items-baseline gap-5 mb-10'>
                <Link to="/" className="text-white font-extrabold hover:text-blue-600 active:text-blue-900">{"<-"}</Link>
                <h1 className="text-2xl font-extrabold mb-6">BERECHNUNG</h1>
                <div></div>
            </div>

            <div>
                Handicap result: {result}
            </div>


        </>
    )
}
