import React from 'react'
import Gamecard from '../components/Gamecard'
import { egames } from '../data'

const Generalgames = () => {
  return (
    <>
    
<div className='px-[4vw] w-[100%]'>
<h3 className='py-[3vw] font-bold'>Currently Available</h3>
    <div className='flex items-center justify-center'>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-[10vw] '>
        {egames.map((gengame)=>(
            <Gamecard key={gengame.id} title={gengame.title} image={gengame.image} date={gengame.date} time={gengame.time} winprice={gengame.winprice} playerslot={gengame.playerslot}/>
        ))}
      </div>
      </div>
      </div>
    </>
  )
}

export default Generalgames
