import { Button, Flex } from '@chakra-ui/react'
import { PinModal } from '@renderer/components/PinModal'
import Sidebar from '@renderer/components/Sidebar'
import { globalCounterState } from '@renderer/storage/globalCounterState'
import { loginState } from '@renderer/storage/loginState'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export const SettingPage = (): React.ReactElement => {
  const [isLogin, setLogin] = useRecoilState(loginState)

  const [pin, setPin] = useState<string | null>(window.localStorage.getItem('pin'))
  const [globolCounter, setGlobolCounter] = useRecoilState<number>(globalCounterState)
  useEffect(() => {}, [pin])
  return (
    <>
      <Flex flexDirection="row">
        <Sidebar />
        <Flex flexDirection="column" w="100%">
          {isLogin && (
            <>
              <Button
                className="m-3 border-2"
                onClick={() => {
                  window.localStorage.removeItem('pin')
                  setPin(null)
                  setLogin(false)
                }}
              >
                Reset Pin
              </Button>
            </>
          )}
          {!isLogin && (
            <>
              <PinModal />
            </>
          )}
          <Button
            className="m-3 border-2"
            onClick={() => {
              setGlobolCounter(globolCounter * 0)
            }}
          >
            重置 Global Counter
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
