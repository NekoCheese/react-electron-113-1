# 視窗程式設計

## Electron

## React

## React UI - Chakra

- 於專案目錄下安裝套件

```
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

於專案入口文件引入

```tsx
import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <React.StrictMode>
      <ChakraProvider> // <-
        <myApp />
      </ChakraProvider> // <-
    </React.StrictMode>
  )
}
```

## Tailwind Css

- 引入 css (依框架不同有所差異)
- 於專案資料夾輸入以下指令
  ```
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init
  ```
- 執行 init 指令自動建立\*.config.js文件後將套件引入
  - postcss.config.js
    ```js
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
    ```
  - tailwind.config.js
    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ['./src/**/*.{html,js}'],
      theme: {
        extend: {}
      },
      plugins: []
    }
    ```
- 修改css文件引入(記得import）
  - main.css
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## Vite
