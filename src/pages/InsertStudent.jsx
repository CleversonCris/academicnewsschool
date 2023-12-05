import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function InsertStudent() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [RA, setRA] = useState("")
  const [idSchool, setIdSchool] = useState("")




  return (
    <section className='flex justify-center items-center h-screen'>
        <form action="" className='flex p-4 border-2 border-purple-500 flex-col gap-2'>
            <label htmlFor="" className='flex flex-col gap-1'>
                <span>Email:</span>
                <input 
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                className='border-2'
                />
            </label>
            <label htmlFor="" className='flex flex-col gap-1'>
                <span>Senha:</span>
                <input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="text"
                className='border-2'
                />    
            </label>
            <label htmlFor="" className='flex flex-col gap-1'>
                <span>RA:</span>
                <input 
                value={RA}
                onChange={e => setRA(e.target.value)}
                type="text"
                className='border-2'
                />
            </label>
            <button className='bg-purple-500 h-8 text-white'>Cadastrar aluno</button>
        </form>
    </section>
  )
}
