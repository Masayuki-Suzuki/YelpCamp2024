import NavLinkItem, { NavLink } from '../Atoms/Navigation/NavLink.tsx'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Nullable } from '../types/utilities.ts'
import { ListItem, UnorderedList } from '@chakra-ui/react'

const HeaderNavList = () => {
    const navLinks: Omit<NavLink, 'pathName'>[] = [
        {
            title: 'Home',
            href: '/',
            iconPosition: 'left'
        },
        {
            title: 'Campgrounds',
            href: '/campgrounds',
            iconPosition: 'left'
        }
    ]

    const location = useLocation()
    const [pathName, setPathName] = useState<Nullable<string>>(null)

    useEffect(() => {
        setPathName(location.pathname)
    }, [location])

    return (
        <UnorderedList display="flex" alignItems="center" styleType="none">
            {navLinks.map(navLink => (
                <ListItem px={2} key={navLink.href}>
                    {pathName && (
                        <NavLinkItem
                            title={navLink.title}
                            href={navLink.href}
                            pathName={pathName}
                            iconPosition={navLink.iconPosition}
                        />
                    )}
                </ListItem>
            ))}
        </UnorderedList>
    )
}

export default HeaderNavList
