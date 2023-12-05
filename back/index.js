const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
import {v4} from 'uuid'
import { client } from './db/conn'
const uuid = v4()

app.use(cors())
app.use(express.json())

app.post('/createstudent', async(req, res) => {
    const {name, email, password, confirmPassword, RA, token} = req.body
    if(password !== confirmPassword) return
    if(name === '' || email === '' || RA === '') return
    const decodeToken = jwt.decode(token, '32da')
    const {accounts_id} = decodeToken
    const query = `INSERT INTO students (id, name, ra, password, email, accounts_id) values('${uuid}', '${name}', '${RA}', '${password}', '${email}', '$')`
    const result = await client.query(query)
    if(result){
        res.json({msg: 'Aluno inserido com sucesso na base de dados', error: false})
        console.log('ALUNO INSERIDO COM SUCESSO')
    } else {
        res.json({msg: 'Falha ao inserir aluno', error: true})
        console.log('ERROR')
    }
})

app.post('/createadministrator', async(req, res) => {
    const {name,email,token,typeUser,password,confirmPassword, permissions} = req.body

    if(password !== confirmPassword) return

    if(name === '' || email === '') return
    
    //Verificando se existe um usuário com o mesmo email

    const query = `SELECT * FROM schools_accounts where email = '${email}'`
    const result = await client.query(query)
    if(result.rows[0]){
        res.json({msg: 'Usuário já existe', error: true})
        return
    } else {

        const tokenVerify = jwt.verify(token, 'jodka23')
        if(tokenVerify) {
            const decodeToken = jwt.decode(token, 'jodka23')
            console.log(decodeToken)
            const {accounts_id} = decodeToken
            const query = `INSERT INTO schools_accounts (accounts_id, name, id, permissions, email, password, typeuser) values('${accounts_id}','${name}','${uuid}','${JSON.stringify(permissions)}', '${email}', '${password}', '${typeUser}')`
            const result = await client.query(query)

            if(result){
                res.json({msg: 'Usuário inserido com sucesso na base de dados'})
            }
        }
        
    }

})

app.post('/login', async(req, res) => {
    const {email, password} = req.body

    if(email === '' || password === '') return

    const query = `SELECT * FROM schools where email = '${email}'`

    const result = await client.query(query)
    if(result.rows[0]){
        const query = `SELECT * FROM schools where password = '${password}'`
        const result = await client.query(query)
        if(result.rows[0]){
            const token = jwt.sign({uuid: result.rows[0].idschool, accounts_id:result.rows[0].accounts_id, userName: result.rows[0].name}, 'jodka23')
            res.json({msg: 'Login feito com sucesso', token})
        } else {
            res.json({msg: 'A senha está incorreta', error: true})
        }
    } else {
        res.json({msg: 'Existe email não existe', error: true})
    }
})
app.post('/authenticate' , async(req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.json({ msg: 'Token not provided' });
        }

        const verifyToken = jwt.verify(token, 'jodka23');
        const decodeToken = jwt.decode(token,'jodka23')
        const {userName} = decodeToken
       
        if (verifyToken) {
            res.json({ authenticate: true, userName: userName});
        } else {
            res.json({ msg: 'Failed to authenticate' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        if(error.message === 'invalid signature'){
            res.json({authenticate: false})
        }
    }
})

app.post('/getnoticesbyid', async(req, res) => {
    const {id, token} = req.body
    console.log(id)
    let newId = id[0]
    if(id.length === 2){
        newId = id[0] + ' ' + id[1]
        console.log(newId)
    }
    if(id.length === 3){
        newId = id[0] + ' ' + id[1] + ' ' + id[2] 
        console.log(newId)
    }
    if(id.length === 4){
        newId = id[0] + ' ' + id[1] + ' ' +  id[2] + ' ' + id[3]
        console.log(newId)
    }
    if(id.length === 5){
        newId = id[0] + ' ' + id[1] + ' ' + id[2] + ' ' + id[3] + ' ' + id[4]
        console.log(newId)
    }

    if(token === null || token === undefined) return

    const verifyToken = jwt.verify(token, '32da')

    if(verifyToken) {
        const query = `SELECT * FROM notice WHERE school = '${newId}'`
        const result = await client.query(query)
        if(result.rows){
            const notices = result.rows
            res.json({notices})
        }
    }
    
})

app.post('/manage-accounts', async(req, res) =>{

    const token = req.body.token
    const decodeToken = jwt.decode(token, '32da')

    const {accounts_id} = decodeToken
    const query = `SELECT * FROM schools_accounts WHERE accounts_id = '${accounts_id}'`
    const result = await client.query(query)
    console.log(decodeToken)
    if(result.rows){
        res.send({accounts: result.rows})
    }
})

app.post('/getprofile', (req, res) => {
    const {token} = req.body
    const decodeToken = jwt.decode(token, '32da')
    res.json({name: decodeToken.userName})
})

app.listen(3001, () => {
    console.log('Rodando na porta 3001')
})
