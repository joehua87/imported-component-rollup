import React, { lazy as _, Suspense } from 'react'
import { lazy } from 'react-imported-component'

const PageA = lazy(() => import('./pages/PageA'))
const PageB = lazy(() => import('./pages/PageB'))

export const App = () => {
  return (
    <Suspense fallback="">
      <PageA />
      <PageB />
    </Suspense>
  )
}
