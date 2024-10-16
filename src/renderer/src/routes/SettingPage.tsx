import { Button, Flex } from '@chakra-ui/react'
import { PinModal } from '@renderer/components/PinModal'
import Sidebar from '@renderer/components/Sidebar'
import { loginState } from '@renderer/storage/loginState'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

export const SettingPage = (): React.ReactElement => {
  const [isLogin, setLogin] = useRecoilState(loginState)

  const [pin, setPin] = useState<string | null>(window.localStorage.getItem('pin'))

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
        </Flex>
      </Flex>
    </>
  )
}
