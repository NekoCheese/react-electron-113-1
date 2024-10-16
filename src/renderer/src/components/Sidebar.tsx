'use client'

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  useColorMode,
} from '@chakra-ui/react'
import {
  FiHome,
  FiSettings,
  FiBookmark,
  FiMoon,
  FiSun,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LinkItemProps {
  name: string
  routePath: string
  icon: IconType
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Home',
    routePath: '/home',
    icon: FiHome,
  },
  {
    name: 'TodoList',
    routePath: '/todo',
    icon: FiBookmark,
  },
  {
    name: 'Example',
    routePath: '/example',
    icon: FiSettings,
  },
]

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }}>
        {/* Content */}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}





const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode()  // Chakra UI Hook，用來獲取和切換模式
  const [themeState, setThemeState] = useState(window.localStorage.getItem('chakra-ui-color-mode'))
  // 初始化 themeState，從 localStorage 中讀取
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('chakra-ui-color-mode')
    setThemeState(savedTheme || colorMode)
  }, [colorMode])

  // 切換主題模式時，同步更新 localStorage 和 state
  const handleToggleTheme = () => {
    toggleColorMode()  // 切換模式
    const newTheme = colorMode === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('chakra-ui-color-mode', newTheme)
    setThemeState(newTheme)
  }

  const navigate = useNavigate()
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={() => navigate(link.routePath)}>
          {link.name}
        </NavItem>
      ))}
      <Button size='sm' className='ml-5' onClick={handleToggleTheme}>
        {themeState === 'light'
          ? <FiMoon />
          : <FiSun />
        }
      </Button>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        onClick={() => { }}
        align="center"
        p="4"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}
