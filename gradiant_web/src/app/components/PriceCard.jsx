// LowestPriceCard.js
import React from 'react';

function PriceCard({ price, title }) {
  return (
    <div className='border-white border-[5px] rounded-lg h-[400px] w-[350px]'>
      <h3 className='text-[30px] font-sans font-semibold m-5 text-center'>
        {title}
      </h3>
      <div className='text-[20px] font-sans font-semibold m-5 text-start mt-5'>
        Price:
      </div>
      <div className='text-[30px] text-white font-sans font-semibold mx-5 mt-1'>
        {price?.price} €/kWh
      </div>
      <div className='text-[20px] font-sans font-semibold mx-5 text-start mt-3'>
        Date:
      </div>
      <div className='text-[30px] text-white font-sans font-semibold mx-5 mt-1'>
        {price?.date}
      </div>
      <div className='text-[20px] font-sans font-semibold mx-5 text-start mt-5'>
        Hour:
      </div>
      <div className='text-[30px] text-white font-sans font-semibold mx-5 mt-1'>
        {price?.hour}
      </div>
    </div>
  );
}

export default PriceCard;