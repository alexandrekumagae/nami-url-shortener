import { FastifyInstance } from 'fastify'

import { redis } from '../../lib/redis';

export async function getRankLinks (app: FastifyInstance) {
  app.get('/rank', async function(request, reply) {
    try {
      const result = await redis.zRangeByScoreWithScores('rank', 0, 50)

      const rank = result
        .sort((a, b) => b.score - a.score)
        .map(item => {
          return {
            link: item.value,
            acessos: item.score
          }
        })

      return reply.send(rank)
    } catch (err) {
      console.log('err', err)
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    }
  })
}

