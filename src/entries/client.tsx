import React from 'react'
import { hydrate } from 'react-dom'
import { rehydrateMarks } from 'react-imported-component'

import { App } from '../App'

const path = location.pathname

rehydrateMarks().then(() => {
  hydrate(<App page={path} />, document.getElementById('root'))
})
