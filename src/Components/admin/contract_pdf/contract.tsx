import React from 'react'

export default function Contract() {
  const currentDate = new Date();
  const day = currentDate.getDate(); // 26
const month = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = currentDate.getFullYear(); // 2023
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return (
    <div className='p-4'>
      <div className="flex flex-row  ">
        <img src="/images/logo.png" alt="" className='w-24 h-24' />
        <div className="info">
          <h1 className='font-bold'>SEASPEED MARINE SERVICES LLP</h1>
          <p className='text-xs font-extralight'>Skylark, 208/2nd floor, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614</p>
          <p className='text-xs font-extralight'>Contact No. 022- 7272532, Mobile. +91 9762345738</p>
          <p className='text-xs font-extralight'>Email. crewing@seaspeed.in , info@seaspeed.in. Web : https://seaspeed.in</p>
        </div>

      </div>
      <hr className='bg-IbColor h-1 my-2' />
      <div className=''>
        <p>Date: {formattedDate}</p>
        <p></p>
      </div>

    </div>
  )
}
