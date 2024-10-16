// All CSS
import './assets/main.css'

// Chakra UI
import { ChakraProvider } from '@chakra-ui/react'

// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// React Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from './routes/HomePage';
import { ExamplePage } from './routes/ExamplePage';
import { RecoilRoot } from 'recoil';
import { TodoPage } from './routes/TodoPage';

const router = createBrowserRouter([
  // 範例路由
  {
    path: "/example",
    element: <ExamplePage />,
  },
  // 預設路由
  {
    path: "/",
    element: <HomePage />,
  },
  // vv 自訂路由 vv
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/todo",
    element: <TodoPage />,
  },
]);

// 程式結構 框架結構
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>                        {/* React */}
    <RecoilRoot>                            {/* Recoil       狀態控制 */}
      <ChakraProvider>                      {/* Chakra UI    樣式 */}
        <RouterProvider router={router} />  {/* React Router 路由*/}
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
)
