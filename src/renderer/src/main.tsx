// All CSS
import './assets/main.css'

// Chakra UI
import { ChakraProvider } from '@chakra-ui/react'

// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// React Router
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { HomePage } from './routes/HomePage'
import { ExamplePage } from './routes/ExamplePage'
import { RecoilRoot } from 'recoil'
import { TodoPage } from './routes/TodoPage'
import { MqttPage } from './routes/MqttPage'
import { SettingPage } from './routes/SettingPage'

const router = createBrowserRouter([
  // 範例路由
  {
    path: '/example',
    element: <ExamplePage />
  },
  // 預設路由
  {
    path: '/',
    element: <HomePage />
  },
  // vv 自訂路由 vv
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/todo',
    element: <TodoPage />
  },
  {
    path: '/mqtt',
    element: <MqttPage />
  },
  {
    path: '/setting',
    element: <SettingPage />
  },
  // 捕捉所有未匹配路由，並重定向到 HomePage
  {
    path: '*', // 使用 * 來匹配所有路由
    element: <Navigate to="/" replace />
  }
])

// 程式結構 框架結構
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
)
