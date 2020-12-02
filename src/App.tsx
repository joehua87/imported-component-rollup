import React from 'react'
import importedComponent from 'react-imported-component'

const PageA = importedComponent(() => import('./pages/PageA'))
const PageB = importedComponent(() => import('./pages/PageB'))

export const App = () => {
  return (
    <div>
      <div>
        <PageA />
        <PageB />
      </div>
    </div>
  )
}
