import { NavLink as ReactRouterLink } from 'react-router-dom'
import { Link, Text } from '@chakra-ui/react'

export type NavLink = {
    title: string
    href: string
    pathName: string
    icon?: JSX.Element
    iconPosition: 'left' | 'right'
}

const defaultNavLinks: NavLink = {
    title: '',
    href: '',
    iconPosition: 'left',
    pathName: ''
}

const LinkDom = ({ title, icon, iconPosition }: Omit<NavLink, 'href' | 'pathName'>) => (
    <>
        {icon && iconPosition === 'left' && icon}
        <Text>{title}</Text>
        {icon && iconPosition === 'right' && icon}
    </>
)

const NavLinkItem = ({ title, href, icon, iconPosition, pathName }: NavLink = defaultNavLinks) => {
    const styleProps = {
        color: '#fff',
        fontWeight: 'bold'
    }

    if (href === pathName) {
        return (
            <Text {...styleProps} textDecoration="underline">
                <LinkDom title={title} icon={icon} iconPosition={iconPosition}/>
            </Text>
        )
    }

    // It looks like Link component of Chakra UI doesn't have a function like NavLink's exact prop? 🤔
    return (
        <Link
            as={ReactRouterLink}
            to={href}
            {...styleProps}
            _hover={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff' }}
        >
            <LinkDom title={title} icon={icon} iconPosition={iconPosition}/>
        </Link>
    )
}

export default NavLinkItem
