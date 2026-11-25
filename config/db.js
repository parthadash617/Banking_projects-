import pg from "pg"
import dotenv from "dotenv"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const configDirectory = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(configDirectory, "../../.env") })

const {Pool}=pg
const pool= new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
})

export default pool