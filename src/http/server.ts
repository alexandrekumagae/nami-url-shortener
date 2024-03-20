import fastify from "fastify";

import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getLinkConverted } from "./routes/get-link-converted";
import { getRankLinks } from "./routes/get-rank-links";

const app = fastify()

app.register(createLink)
app.register(getLinks)
app.register(getLinkConverted)
app.register(getRankLinks)

app.listen({port: 3002}).then(() => {
  console.log('HTTP server is running on http://localhost:3002 🔥.')
})