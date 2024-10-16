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
	Center,
	Flex,
	Spacer
} from '@chakra-ui/react'
import { BasicBlock } from '@renderer/components/BasicBlock'
import Sidebar from '@renderer/components/Sidebar'
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
			<Flex flexDirection='row'>
				<Sidebar />
				<Flex flexDirection='column' w='100%'>

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

					<Center>
						<h1 className=' font-bold'>HomePage</h1>
					</Center>

					<BasicBlock>
						<Flex>
							<Button onClick={() => {
								navigate('/home')
							}}>HomePage</Button>
							<Button onClick={() => {
								navigate('/example')
							}}>ExamplePage</Button>
							{isLogin && (
								<>
									<Spacer />
									<Button
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
						</Flex>
					</BasicBlock>
				</Flex>
			</Flex>
		</>
	)
}