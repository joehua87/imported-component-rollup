export async function resolve(specifier, context, defaultResolve) {
  if (['react', 'react-dom'].includes(specifier)) {
    return defaultResolve('preact/compat/dist/compat.mjs', context, defaultResolve)
  }
  if (['react-dom/server'].includes(specifier)) {
    return defaultResolve('preact-render-to-string', context, defaultResolve)
  }
  return defaultResolve(specifier, context, defaultResolve)
}
