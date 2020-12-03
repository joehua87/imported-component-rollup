/* eslint-disable @typescript-eslint/no-var-requires */
import Fastify from 'fastify'
import Compress from 'fastify-compress'
import Static from 'fastify-static'
import path from 'path'
import React from 'react'

import {
  App,
  printDrainHydrateMarks,
  renderWithSuspense,
  whenComponentsReady,
} from './dist/server.mjs'

async function render(page) {
  await whenComponentsReady()
  const ele = React.createElement(App, { page })
  const html = await renderWithSuspense(ele)
  return html + printDrainHydrateMarks()
}

const app = Fastify()

async function bootstrap() {
  app.register(Compress, { global: true, encodings: ['deflate', 'gzip'] })
  app.register(Static, {
    prefix: '/assets/',
    root: path.resolve('dist/browser'),
  })

  app.get('*', async (req, reply) => {
    reply.type('text/html')
    const html = await render(req.url)
    return `
    <html>
    <head>
    <script>
    var global = window;
    </script>
    </head>
    <body>
    <div id="root">${html}</div>
    <script type='module' src='/assets/index.js'></script>
    </body>
    </html>
    `
  })

  await app.listen(5000, '0.0.0.0')
  console.log('Listen to 5000')
}

bootstrap()
