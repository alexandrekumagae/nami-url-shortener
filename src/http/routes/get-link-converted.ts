import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'


import z from 'zod'
import { redis } from '../../lib/redis';
import { link } from 'fs';

export async function getLinkConverted (app: FastifyInstance) {
  const client = await pg.connect();

  app.get('/:code', async function(request, reply) {
    const getLinkSchema = z.object({
      code: z.string().min(3)
    })

    const { code } = getLinkSchema.parse(request.params)

    try {
      const result = await pg.query(
        'SELECT code, url FROM links WHERE code = $1',
        [code]
      )

      await redis.zIncrBy('rank', 1, String(result.rows[0].code))
  
      return reply.redirect(301, String(result.rows[0].url))
    } catch (err) {
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    } finally {
      await client.release();
    }
  })
}

