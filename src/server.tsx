import React from 'react'
import { printDrainHydrateMarks, whenComponentsReady } from 'react-imported-component'

import { App } from '../dist/browser'
import { renderWithSuspense } from './renderWithSuspense'

async function run() {
  await whenComponentsReady()
  const html = (await renderWithSuspense(<App />)) + printDrainHydrateMarks()
  console.log('App html', html)
}

run()
