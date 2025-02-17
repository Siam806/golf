import React from 'react'
import InputField from './InputField'

export default function EGAForm() {
  const ergebnis = 100;

  const hc = (e) => { console.log(e) }
  const par = (e) => { console.log(e) }

  return (
    <div>
      <div className='flex justify-center items-center flex-col'>

        <section className='flex justify-center flex-row mt-10 mb-15'>
          <InputField title="bisheriges Handicap" onChange={hc} />
          <div className='w-20'></div>
          <InputField title="PAR des Golfplatzes" onChange={par} />
        </section>

        <InputField title="Ergebnis" value={ergebnis} />


      </div>

    </div>
  )
}
