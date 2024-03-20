import { Pool } from 'pg'

export const pg = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'nami-url-shortener',
  user: 'docker',
  password: 'docker',
})