import React, { Suspense, useCallback, useState } from 'react'
import { lazy } from 'react-imported-component'

const PageA = lazy(() => import('./pages/PageA'))
const PageB = lazy(() => import('./pages/PageB'))

export const App = ({ page: initialPage }: { page: string }) => {
  // console.log('page', page)
  const [page, setPage] = useState(initialPage)
  const updateRoute = useCallback((v) => {
    setPage(v)
    window.history.pushState({}, '', v)
  }, [])
  return (
    <div>
      <a
        href="/a"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          updateRoute('/a')
        }}
      >
        Page A
      </a>
      <a
        href="/b"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          updateRoute('/b')
        }}
      >
        Page B
      </a>
      <Suspense fallback="">
        {page === '/a' && <PageA />}
        {page === '/b' && <PageB />}
        {!['/a', '/b'].includes(page) && <div>Not found</div>}
      </Suspense>
    </div>
  )
}
