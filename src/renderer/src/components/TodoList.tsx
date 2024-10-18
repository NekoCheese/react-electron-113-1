import {
  Flex,
  Input,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { BasicBlock } from './BasicBlock'
import { TodoItem, todoListState } from '@renderer/storage/todoList'

export const TodoList = (): React.ReactElement => {
  const [todoList, setTodoList] = useRecoilState(todoListState) // 讀取和修改 todoList 狀態
  const [inputValue, setInputValue] = useState('') // 本地輸入框狀態

  const addItem = (): void => {
    if (inputValue.trim() === '') return // 防止空值

    const newItem: TodoItem = {
      id: Date.now(), // 簡單地使用時間戳作為 id
      text: inputValue,
      isComplete: false
    }

    setTodoList((oldTodoList) => [...oldTodoList, newItem]) // 加入新項目
    setInputValue('') // 清空輸入框
  }

  const deleteItem = (id: number): void => {
    setTodoList((oldTodoList) => oldTodoList.filter((item) => item.id !== id))
  }

  return (
    <>
      <BasicBlock>
        <Flex>
          <Input
            placeholder="待辦事項"
            type="text"
            value={inputValue}
            borderRadius={0}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button borderRadius={0} onClick={addItem}>
            Add
          </Button>
        </Flex>
      </BasicBlock>

      <BasicBlock>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>編號</Th>
                <Th w="80%">說明</Th>
                <Th>完成</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todoList.map((item) => (
                <Tr key={item.id}>
                  <Td>ID:{item.id}</Td>
                  <Td>{item.text}</Td>
                  <Td>
                    <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </BasicBlock>
    </>
  )
}
