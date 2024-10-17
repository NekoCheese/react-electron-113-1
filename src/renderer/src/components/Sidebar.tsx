'use client'

import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  BoxProps,
  FlexProps,
  Button,
  useColorMode
} from '@chakra-ui/react'
import { FiHome, FiSettings, FiBookmark, FiMoon, FiSun, FiRss, FiCoffee } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginState } from '@renderer/storage/loginState'
import { useRecoilState } from 'recoil'
import { PinModal } from './PinModal'

interface LinkItemProps {
  name: string
  routePath: string
  icon: IconType
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Home',
    routePath: '/home',
    icon: FiHome
  },
  {
    name: 'TodoList',
    routePath: '/todo',
    icon: FiBookmark
  },
  {
    name: 'AIoT',
    routePath: '/mqtt',
    icon: FiRss
  },
  {
    name: 'Setting',
    routePath: '/setting',
    icon: FiSettings
  },
  {
    name: 'Example',
    routePath: '/example',
    icon: FiCoffee
  }
]

export default function SimpleSidebar(): React.ReactElement {
  const [isLogin, setLogin] = useRecoilState(loginState)

  useEffect(() => {
    setLogin
  }, [])

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {!isLogin && <PinModal />}
      <SidebarContent display={{ base: 'none', md: 'block' }} />
    </Box>
  )
}

interface SidebarProps extends BoxProps {}

const SidebarContent = ({ ...rest }: SidebarProps): React.ReactElement => {
  const navigate = useNavigate()
  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} onClick={() => navigate(link.routePath)}>
            {link.name}
          </NavItem>
        ))}
        <ToggleThemeBtn />
      </Box>
      <Box ml={{ md: 60 }} />
    </>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
}

const NavItem = ({ icon, children, ...rest }: NavItemProps): React.ReactElement => {
  return (
    <Box _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="sm"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const ToggleThemeBtn = (): React.ReactElement => {
  const { colorMode, toggleColorMode } = useColorMode() // Chakra UI Hook，用來獲取和切換模式
  const [themeState, setThemeState] = useState(window.localStorage.getItem('chakra-ui-color-mode'))
  // 初始化 themeState，從 localStorage 中讀取
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('chakra-ui-color-mode')
    setThemeState(savedTheme || colorMode)
  }, [colorMode])

  // 切換主題模式時，同步更新 localStorage 和 state
  const handleToggleTheme = (): void => {
    toggleColorMode() // 切換模式
    const newTheme = colorMode === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('chakra-ui-color-mode', newTheme)
    setThemeState(newTheme)
  }

  return (
    <Box _focus={{ boxShadow: 'none' }}>
      <Flex align="center" p="4" mx="4" borderRadius="sm">
        <Button size="sm" className="" onClick={handleToggleTheme}>
          {themeState === 'light' ? <FiMoon /> : <FiSun />}
        </Button>
      </Flex>
    </Box>
  )
}
