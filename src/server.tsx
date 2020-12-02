import React from 'react'
import { renderToString } from 'react-dom/server'
import { printDrainHydrateMarks } from 'react-imported-component'

import { App } from './App'
const html = renderToString(<App />) + printDrainHydrateMarks()
console.log('html', html)
