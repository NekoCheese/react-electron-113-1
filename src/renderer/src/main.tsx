// 套用 main.css 中的 Tailwind css
import './assets/main.css'

// 引入第三方 UI 元件庫 chakra-ui
import { ChakraProvider } from '@chakra-ui/react'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
