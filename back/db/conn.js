import { Client } from "pg";
export const client = new Client({
    host: 'localhost',
    password: '1234',
    user: 'cleverson',
    database: 'academicnews',
    port: 5432
})

client.connect()