import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

export async function getLinks (app: FastifyInstance) {
  const client = await pg.connect();

  app.get('/api/links', async function(request, reply) {
    try {
      const result = await pg.query(
        'SELECT id, code, url FROM links ORDER BY created_at DESC')
        
      return reply.send(result.rows)
    } catch (err) {
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    } finally {
      await client.release();  
    }
  })
}

