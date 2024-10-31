import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'

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

useRouter(app);

serve({
  fetch: app.fetch,
  port: 8080,
}, () => console.log("Server started!!!"))