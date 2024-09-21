import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <header className='w-full h-[70px] bg-cyan-950'>
      <nav className='w-full h-full flex justify-center items-center'>
        <Link href='/' >
          <button className='text-white text-3xl font-bold'>
            <p className='max-xl:text-[27px] max-lg:text-2xl max-sm:text-xl'>Car Dealer App</p>
          </button>
        </Link>
      </nav>
    </header>
  )
}
