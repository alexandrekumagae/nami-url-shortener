import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

import z from 'zod'

export async function createLink (app: FastifyInstance) {
  const client = await pg.connect();
  
  app.post('/api/links', async function(request, reply) {  
    const createLinkSchema = z.object({
      code: z.string().min(3),
      url: z.string().min(3)
    })
    
    const { code, url } = createLinkSchema.parse(request.body)

    try {
      const result = await pg.query(
        'INSERT INTO links (code, url) VALUES ($1, $2) RETURNING id',
        [code, url]
      )

      return reply.status(201).send({ id: result.rows[0] })
    } catch (err) {
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    } finally {
      await client.release();  
    }
  })
}