import { useEffect } from 'react'
import MyEditor from './components/Editor'
import { applyThemeVars } from './themes/tokens'
import { catppuccinTokens } from './themes/catppuccin'

function App(): React.JSX.Element {
  useEffect(() => {
    window.api.config.get().then(({ appearance }) => {
      if (appearance.theme === 'catppuccin') {
        applyThemeVars(catppuccinTokens(appearance.variant))
      }
    })
  }, [])

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: 'var(--color-base)', color: 'var(--color-text)' }}
    >
      <MyEditor />
    </div>
  )
}

export default App
