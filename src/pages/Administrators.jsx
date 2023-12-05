import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import StudentForm from '../components/StudentForm'
import AdministratorForm from '../components/AdministratorForm'
export default function Administrators() {

  const [typeUserSelect, setTypeUserSelect] = useState(null)
  
  return (
    <>  
      <NavBar/>
      {typeUserSelect === null && <section className='h-[calc(100vh-64px)] gap-4 flex-col flex items-center justify-center'>
          <h1 className='text-2xl'>Qual será o tipo de usuário?</h1>
          <div className="select-type-user flex gap-12">
              <button className='border-2 hover:bg-black hover:text-white min-w-[200px] border-black px-4 py-1' onClick={()=> setTypeUserSelect('administrator')}>Administrador </button>
              <button className='border-2 hover:bg-black hover:text-white min-w-[200px] border-black px-4 py-1' onClick={()=> setTypeUserSelect('student')}> Aluno</button>
          </div>
      </section>}
      {typeUserSelect === 'student' && <StudentForm backOption={() => setTypeUserSelect(null)} insertOtherUser={() => {
        setTypeUserSelect(null)
      }}/>}
      {typeUserSelect === 'administrator' && <AdministratorForm backOption={() => setTypeUserSelect(null)} insertOtherUser={() => {
        setTypeUserSelect(null)
      }}/>}
    </>
  )
}
