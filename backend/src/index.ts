import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'

import useRouter from './routers/index.js'

const app: Hono = new Hono()

// Error handling middleware
app.onError((err: Error, c) => {
  console.error(`${err}`)
  return c.json({
    error: 'Internal Server Error',
    message: err.message
  }, 500)
})

app.use('/*', cors())

app.use('/mrf_files/*', serveStatic({ root: './' }))

useRouter(app);

const PORT = Number(process.env.PORT) || 8080;

serve({
  fetch: app.fetch,
  port: PORT,
}, () => console.log(`Server running on port : ${PORT}`))