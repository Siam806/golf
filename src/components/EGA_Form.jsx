import React from 'react'
import InputField from './InputField';
import { Link, redirect, useNavigate } from 'react-router-dom';


export default function EGAForm() {
  
  const navigate = useNavigate();

  const calcHandicap = (e) => {
    e.preventDefault();
    const props = Object.fromEntries(new FormData(e.target));
    

    // TODO: calculate handicap here
    const result = 0;

    navigate('/calculated', { state: result });
  }

  return (
    <div>
      <form className='flex flex-col items-stretch gap-1 mt-3' onSubmit={(e) => calcHandicap(e)}>

        <section className='grid grid-cols-2 grid-rows-2 my-1 justify-around'>

          <InputField title="bisheriges Handicap" name="hc" />

          <InputField title="PAR des Golfplatzes" name="par" />

          <InputField title="Anzahl Schläge" name="count" />

          <label className='justify-self-center flex items-center gap-2'>
            8er Loch:
            <input className='scale-150' type="checkbox" name="is8Holes" />
          </label>

        </section>

        <section className='flex justify-center mt-10'>
          <button type='submit' className="text-m border-2 bg-gray-700 px-5 py-3 rounded-2xl active:bg-gray-600">BERECHNEN</button>
        </section>

      </form>

    </div>
  )
}
