import prefresh from '@prefresh/vite'
import { UserConfig } from 'vite'

const config: UserConfig = {
  jsx: 'react',
  plugins: [prefresh()],
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
}

export default config
