import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function AdministratorForm({insertOtherUser, backOption}) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [messageFront, setMessageFront] = useState(null)
  const [messageBack, setMessageBack] = useState(null)

  const [typeUser, setTypeUser] = useState('professor')

  console.log(typeUser)
  const [permissionCreateNotice, setPermissionCreateNotice] = useState(false)
  const [permissionEditNotice, setPermissionEditNotice] = useState(false)
  const [permissionDeleteNotice, setPermissionDeleteNotice] = useState(false)
  const [permissionAddUser, setPermissionAddUser] = useState(false)
  const [image, setImage] = useState(null)
  const [highLevelPermission, setHighLevelPermission] = useState(0)

  useEffect(() =>{

    let highLevelPermission = 0

    if(permissionAddUser === true){
        highLevelPermission = highLevelPermission + 1
    }
    if(permissionCreateNotice === true){
        highLevelPermission = highLevelPermission + 1
    }
    if(permissionEditNotice === true){
        highLevelPermission = highLevelPermission + 1
    }

    if(permissionDeleteNotice === true){
        highLevelPermission = highLevelPermission + 1
    }
    setHighLevelPermission(highLevelPermission)

  }, [permissionAddUser, permissionCreateNotice, permissionEditNotice, permissionDeleteNotice])


  const handleSubmit = async(e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessageFront('Senhas não coincidem')
    }
    if(email === '' || password === '' || name === ''){
        setMessageFront('Preencha todos dados campos')
        return
    }

    const permissions = {
        permissionAddUser,
        permissionCreateNotice,
        permissionEditNotice,
        permissionDeleteNotice
    }

    const token = localStorage.getItem('auth_token')
    console.log(typeUser)
    await axios.post('http://localhost:3001/createadministrator', {
        name,
        email,
        password,
        confirmPassword,
        permissions,
        typeUser,
        token

    }).then(response => {
        if(response.data.msg){
            setMessageFront(null)
            setMessageBack(response.data.msg)
        }
        console.log(response)
    })
  }
  console.log(image)
  const instance = axios.create({
    maxContentLength: 2000000, // Adjust the value based on your needs
  });

  async function EnviarNoticia(e) {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessageFront('Senhas não coincidem')
    }
    if(email === '' || password === '' || name === ''){
        setMessageFront('Preencha todos dados campos')
        return
    }
    const newImage = new FormData()
    newImage.append('image', image)
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(image);

    

    reader.onload = function () {
      document = reader.result;
      data.document = document
      instance.post('http://localhost:3008/createnotice', {
        name,
        email,
        password,
        confirmPassword,
        permissions,
        typeUser,
        token
      }).then(response => {
        if(response.data.msg){
            setMessageFront(null)
            setMessageBack(response.data.msg)
        }
        console.log(response)
    })
      .catch(error => {
        // Handle error
        console.error(error);
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    console.log(data)
    
  }


  return (
    <section className='h-[calc(100vh-64px)] gap-4 flex-col flex justify-center items-center'>
        <form action="" onSubmit={handleSubmit} className='grid grid-cols-2 p-4 border-2 border-black gap-6'>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Nome:</label>
                <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                type="text" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Email:</label>
                <input
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Senha:</label>
                <input
                required
                value={password}
                onChange={e => setPassword(e.target.value)}               
                type="password" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Confirme a Senha:</label>
                <input
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <span>Tipo de usuário</span>
                <select name="" id="" value={typeUser} onChange={(e) => setTypeUser(e.target.value)}>
                    <option value="professor">Professor(a)</option>
                    <option value="aluno">Aluno(a)</option>
                    <option value="coordenador">Coordenador(a)</option>
                    <option value="inspetor">Inspetor(a)</option>
                    <option value="merendeiro">Merendeiro(a)</option>
                    <option value="auxiliarDeLimpeza">Auxiliar de Limpeza(a)</option>
                </select>
            </label>
            <label htmlFor="" className='flex text-white font-medium flex-col gap-2'>
                <span>Permissões</span>
                <div className={`rounded-md border-2 h-8 border-black text-center ${permissionCreateNotice === true ? 'bg-gray-800' : 'bg-gray-500'}`} onClick={() => setPermissionCreateNotice(!permissionCreateNotice)}>Criar Notícia</div>
                <div className={`rounded-md border-2 h-8 border-black text-center ${permissionEditNotice === true ? 'bg-gray-800' : 'bg-gray-500'}`} onClick={() => setPermissionEditNotice(!permissionEditNotice)}>Editar Notícia</div>
                <div className={`rounded-md border-2 h-8 border-black text-center ${permissionDeleteNotice === true ? 'bg-gray-800' : 'bg-gray-500'}`} onClick={() => setPermissionDeleteNotice(!permissionDeleteNotice)}>Excluir Notícia</div>
                <div className={`rounded-md border-2 h-8 border-black text-center ${permissionAddUser === true ? 'bg-gray-800' : 'bg-gray-500'}`} onClick={() => setPermissionAddUser(!permissionAddUser)}>Adicionar um Novo Usuário</div>
            </label>
            <label htmlFor="">
                <input type="file" onChange={e => setImage(e.target.files[0])}/>
            </label>
            <button className='bg-black w-full text-white h-10'>Enviar</button>
        </form>
        <div className='flex justify-center'>
             {messageFront !== null && <button className='bg-red-500 text-white p-4 py-2'>{messageFront}</button>}
        </div>
        <div className='flex flex-col gap-4 items-center justify-center'>
             {messageBack !== null && <button className='bg-green-500 text-white p-4 py-2'>{messageBack}</button>}
             {messageBack !== null && <button  onClick={insertOtherUser} className=' border-2 border-black p-4 py-2 w-60'>Inserir Outro Usuário</button>}
        </div>
        <button onClick={backOption}>Voltar</button>
    </section>
  )
}
