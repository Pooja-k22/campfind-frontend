import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotefound() {
  return (
    <>
    <div className=' min-h-screen md:grid grid-cols-2 bg-gradient-to-b from-[#35afed] via-[#5cb5d5] to-[#cceffc]'>
        <div className='text-white flex flex-col gap-7 px-8 md:px-20 justify-center items-start'>
            <h1 className='text-4xl mt-16 md:text-6xl font-extrabold text-white'>Oops! Even explorers take a wrong turn!</h1>
            <p className='md:text-md'>Looks like this trail doesn't lead anywhere.... let's find you a better path.</p>
<Link to={'/'}>
                <button className='bg-black px-8 py-2 rounded-full hover:bg-gray-800'>Back Home</button>
    
</Link>        </div>
        <div className='relative w-87 md:w-165'>
            <img src={'/images/404.png'} alt=""  className='absolute top-1 md:top-20 -right-2 md:right-6'/>
        </div>

    </div>
    </>
  )
}

export default Pagenotefound