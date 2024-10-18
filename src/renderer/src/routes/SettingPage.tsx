import {
  Button,
  Center,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react'
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

  const [volume, setVolume] = useState<number>(50) // 初始音量
  const [isMuted, setIsMuted] = useState<boolean>(false)

  // 獲取當前音量
  useEffect(() => {
    window.volumeAPI.getVolume().then(setVolume)
    window.volumeAPI.isMuted().then(setIsMuted)
  }, [])

  // 音量調整
  const handleVolumeChange = (value: number) => {
    setVolume(value)
    window.volumeAPI.setVolume(value)
  }

  // 靜音切換
  const toggleMute = () => {
    if (isMuted) {
      window.volumeAPI.unmute()
    } else {
      window.volumeAPI.mute()
    }
    setIsMuted(!isMuted)
  }

  // State for device information and network status
  const [deviceInfo, setDeviceInfo] = useState<{ cpu: string; memory: string; platform: string }>({
    cpu: '',
    memory: '',
    platform: ''
  })
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [ipAddress, setIpAddress] = useState<string>('')

  useEffect(() => {
    // 獲取設備訊息
    const deviceInfo = window.electronAPI.getDeviceInfo()
    setDeviceInfo(deviceInfo)

    // 檢查網絡狀態
    window.electronAPI.checkNetworkStatus().then((status: boolean) => {
      setIsConnected(status)
    })

    // 獲取 IP 地址
    const ip = window.electronAPI.getIPAddress()
    setIpAddress(ip)
  }, [])

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

          {/* Display device information and network status */}
          <Text className="m-3">
            <strong>Device Info:</strong>
            <br /> CPU: {deviceInfo.cpu}
            <br /> Memory: {deviceInfo.memory}
            <br /> OS Platform: {deviceInfo.platform}
            <br /> Network: {isConnected ? 'Connected' : 'Not Connected'}
            <br /> IP Address: {ipAddress}
          </Text>
          <Flex flexDirection="column" w="100%">
            <Text className="m-3">
              <strong>Volume Control</strong>
            </Text>

            <Center>
              <Slider
                w="95%"
                aria-label="volume-slider"
                defaultValue={volume}
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Center>

            <Button className="m-3 border-2" onClick={toggleMute}>
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
