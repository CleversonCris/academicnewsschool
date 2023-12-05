import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/SchoolContext'
export default function SchoolPortal() {

  const {userName} = useContext(Context)

  return (
    <>
    <section className='flex justify-center h-[calc(100vh-64px)] items-center'>
      <div>
        <h1 className='text-3xl'>Seja bem vindo <span className='text-purple-500 font-semibold'>{userName}</span></h1>
      </div>
    </section>
    </>
  )
}
