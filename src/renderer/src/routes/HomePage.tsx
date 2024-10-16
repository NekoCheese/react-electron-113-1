import { Button, Center, Flex } from '@chakra-ui/react'
import Sidebar from '@renderer/components/Sidebar'

export const HomePage = (): React.ReactElement => {
  return (
    <>
      <Flex flexDirection="row">
        <Sidebar />
        <Flex flexDirection="column" w="100%">
          <Center>
            <h1 className=" font-bold">HomePage</h1>
          </Center>

         
        </Flex>
      </Flex>
    </>
  )
}
