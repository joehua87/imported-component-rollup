/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import {
  App,
  printDrainHydrateMarks,
  renderWithSuspense,
  whenComponentsReady,
} from './dist/server.mjs'

async function run() {
  await whenComponentsReady()
  const ele = React.createElement(App, null)
  const html = await renderWithSuspense(ele)
  console.log('html', html + printDrainHydrateMarks())
}

run()
