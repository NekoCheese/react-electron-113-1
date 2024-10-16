import { Flex } from '@chakra-ui/react'
import Sidebar from '@renderer/components/Sidebar'
import { TodoList } from '@renderer/components/TodoList'

export const TodoPage = (): React.ReactElement => {
  return (
    <>
      <Flex flexDirection="row">
        <Sidebar />
        <Flex flexDirection="column" w="100%">
          <TodoList />
        </Flex>
      </Flex>
    </>
  )
}
