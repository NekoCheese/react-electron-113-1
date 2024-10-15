import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    PinInputField,
    PinInput,
    Center
} from '@chakra-ui/react'
import ExampleDetails from '@renderer/components/ExampleDetails'
import Footer from '@renderer/components/ExampleFooter'
import Header from '@renderer/components/ExampleHeader'
import Versions from '@renderer/components/Versions'
import { loginState } from '@renderer/storage/loginState'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

export const HomePage = () => {
    const { onClose } = useDisclosure()
    const [isLogin, setLogin] = useRecoilState(loginState)
    const [pin, setPin] = useState<string | null>(window.localStorage.getItem('pin'))

    const navigate = useNavigate()

    return (
        <>
            <Center>
                <h1 className=' font-bold'>HomePage</h1>
            </Center>
            <Button onClick={() => {
                navigate('/home')
            }}>HomePage</Button>
            <Button onClick={() => {
                navigate('/example')
            }}>ExamplePage</Button>
            {isLogin && (
                <Button
                    onClick={() => {
                        window.localStorage.removeItem('pin')
                        setPin(null)
                        setLogin(false)
                    }}
                >
                    Reset Pin
                </Button>
            )}
            <Versions />


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