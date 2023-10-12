import Link from 'next/link'
import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'

const NavBar = () => {
  const links = [
    {label: 'Agents', href: 'agents'},
    {label: 'Plans', href: 'plans'},
    {label: 'Area', href: 'area'},
    {label: 'Collection', href: 'collection'},
    {label: 'Customer', href: 'customer'},
  ]
  return (
    <nav className='  p-6 rounded-lg w-fit bg-sky-600 space-y-5'>
      <Link href='/'><AiOutlineHome/></Link>
      <ul className='space-y-5'>
        {links.map(link => 
        <Link 
        key={link.href}
        className='hover:text-sky-100 rounded-md transition-colors flex'
        href={link.href}>{link.label}</Link>)}
        
      </ul>
    </nav>
  )
}

export default NavBar
