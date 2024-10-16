import { Flex } from '@chakra-ui/react'
import ExampleDetails from '@renderer/components/ExampleDetails'
import ExampleFooter from '@renderer/components/ExampleFooter'
import ExampleHeader from '@renderer/components/ExampleHeader'
import Sidebar from '@renderer/components/Sidebar'

export const ExamplePage = () => {
  return (
    <>
      <Flex flexDirection='row'>
        <Sidebar />
        {/* 扣除側邊欄剩餘區塊 */}
        <Flex flexDirection='column' w='100%'>
          <ExampleHeader />
          <ExampleDetails />
          <ExampleFooter />
        </Flex>
        {/* 扣除側邊欄剩餘區塊 */}
      </Flex>
    </>
  )
}