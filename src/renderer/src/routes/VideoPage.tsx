import { Box, Center, Flex, Input } from '@chakra-ui/react'
import Sidebar from '@renderer/components/Sidebar'
import { useState } from 'react'

export const VideoPage = (): React.ReactElement => {
  const [url, setUrl] = useState('https://www.youtube.com/')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value) // 更新URL狀態
  }

  return (
    <>
      <Flex flexDirection="row">
        <Sidebar />
        {/* 扣除側邊欄剩餘區塊 */}
        <Flex flexDirection="column" w="100%">
          <Center>
            <Input w="90%" className="m-3" value={url} onChange={handleInputChange} />
          </Center>
          <Center>
            <Box className="border rounded-md m-3" w="90%" h="90vh">
              <webview
                className="border rounded-md"
                src={url}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Center>
        </Flex>
        {/* 扣除側邊欄剩餘區塊 */}
      </Flex>
    </>
  )
}
