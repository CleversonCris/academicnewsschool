import React from 'react'
import { Link } from 'react-router-dom'
export default function Notice({col}) {
  return (
    <div className={`notice ${col} flex flex-col gap-2  p-2 border-2 border-purple-500`}>
                    <img src="https://img.freepik.com/vetores-gratis/plano-de-volta-ao-fundo-da-escola-com-material-escolar_23-2149452368.jpg" className='w-full object-cover h-40' alt="" />
        <div className='max-w-[240px] flex gap-2 flex-col'>
            <h1>Nova parceira com o Franca Basquete</h1>
            <div className="tags grid gap-3 grid-cols-3 ">
                <p className='bg-gray-200 text-center'>Educação</p>
                <p className='bg-gray-200 text-center'>Lazer</p>
            </div>
            <button className='bg-purple-500 h-8 text-white px-4'><Link to='/'>Ver mais</Link></button>
        </div>
    </div>
  )
}
