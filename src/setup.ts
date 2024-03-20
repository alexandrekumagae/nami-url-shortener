import { pg } from "./lib/postgres";

async function setup () {
  await pg.connect()

  await pg.query(
    `DROP TABLE IF EXISTS links`
  )

  await pg.query(
    `CREATE TABLE links (
      id SERIAL PRIMARY KEY,
      code VARCHAR(255) UNIQUE NOT NULL,
      url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  )

  console.log('Setup feito com sucesso!')

  await pg.end()
}

setup()