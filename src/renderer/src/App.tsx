import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  PinInputField,
  HStack,
  PinInput
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const { onClose } = useDisclosure()
  const [isLogin, setLogin] = useState<boolean>(false)
  const [pin, setPin] = useState<string | null>(window.localStorage.getItem('pin'))

  return (
    <>
      {isLogin && (
        <Button
          onClick={() => {
            window.localStorage.removeItem('pin')
            setPin(false)
            setLogin(false)
          }}
        >
          Remove Pin
        </Button>
      )}

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
        <ModalOverlay />
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

export default App
