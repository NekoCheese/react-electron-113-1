import { Box, Button, Center, Flex } from '@chakra-ui/react'
import Sidebar from '@renderer/components/Sidebar'
import { globalCounterState } from '@renderer/storage/globalCounterState'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

export const HomePage = (): React.ReactElement => {
  const [counter, setCounter] = useState<number>(0)
  const [globolCounter, setGlobolCounter] = useRecoilState<number>(globalCounterState)

  return (
    <>
      <Flex flexDirection="row">
        <Sidebar />
        <Flex flexDirection="column" w="100%">
          <Center>
            <h1 className=" font-bold">HomePage</h1>
          </Center>

          <Box as="a" target="_blank" href={'https://staff.nuu.edu.tw/staff/static/'}>
            <Button className="m-3">聯大通訊錄查詢系統</Button>
          </Box>

          <Box>
            <Button className="m-3">{counter}</Button>
            <Button
              onClick={() => {
                setCounter(counter + 1)
              }}
            >
              Counter +1
            </Button>
          </Box>

          <Box>
            <Button className="m-3">{globolCounter}</Button>
            <Button
              onClick={() => {
                setGlobolCounter(globolCounter + 1)
              }}
            >
              Global Counter +1
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
