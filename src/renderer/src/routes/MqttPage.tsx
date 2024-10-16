import { Alert, AlertIcon, Flex } from '@chakra-ui/react'
import Sidebar from '@renderer/components/Sidebar'

export const MqttPage = (): React.ReactElement => {
  return (
    <>
      <Flex flexDirection="row">
        <Sidebar />
        <Flex flexDirection="column" w="100%">
          <Alert status="warning">
            <AlertIcon />
            Nothing here
          </Alert>
        </Flex>
      </Flex>
    </>
  )
}
