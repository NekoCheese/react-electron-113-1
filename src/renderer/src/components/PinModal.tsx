import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  PinInput,
  PinInputField,
  useDisclosure
} from '@chakra-ui/react'
import { loginState } from '@renderer/storage/loginState'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

export const PinModal = (): React.ReactElement => {
  const { onClose } = useDisclosure()
  const [isLogin, setLogin] = useRecoilState(loginState)
  const [pin, setPin] = useState<string | null>(window.localStorage.getItem('pin'))

  return (
    <>
      <Modal isOpen={!pin} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Set Your Pin</ModalHeader>
          <ModalBody>
            <div className="flex justify-center gap-2">
              <PinInput
                onComplete={(inputVal) => {
                  window.localStorage.setItem('pin', inputVal)
                  setPin(inputVal)
                }}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* pin 為 string，！ 的話是false，再加一個 ! 的話則為 true */}
      <Modal isOpen={!!pin && !isLogin} onClose={onClose}>
        <ModalOverlay />s
        <ModalContent>
          <ModalHeader className="text-center">Verify Your Pin</ModalHeader>
          <ModalBody>
            <div className="flex justify-center gap-2">
              <PinInput
                onChange={(inputVal) => {
                  setLogin(pin === inputVal)
                }}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
