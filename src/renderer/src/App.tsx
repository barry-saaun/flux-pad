import { useState } from 'react'
import MyEditor from './components/Editor'

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen w-full flex flex-col my-10 px-5 items-center justify-center ">
      <MyEditor />
    </div>
  )
}

export default App
