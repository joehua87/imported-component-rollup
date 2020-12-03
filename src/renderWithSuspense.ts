import { renderToString as render } from 'react-dom/server'
// import { render } from 'preact-render-to-string'

export async function renderWithSuspense(ele: any) {
  const snapshot1 = Date.now()
  let snapshot2: number
  try {
    return render(ele)
  } catch (err) {
    // If err is a Promise, resolve the Suspense
    if (err.then) {
      await err
      const result = await renderWithSuspense(ele)
      snapshot2 = Date.now()
      console.log({
        snapshot1,
        snapshot2,
        duration: snapshot2 - snapshot1,
      })
      return result
    } else {
      // Throw if it actually an error
      console.log({ err })
      throw err
    }
  }
}
