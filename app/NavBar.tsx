'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {AiOutlineHome} from 'react-icons/ai';
import classnames from 'classnames';
const NavBar = () => {


  const currentPath = usePathname();
  console.log(currentPath);


  const links = [
    {label: 'Agents', href: '/agents'},
    {label: 'Plans', href: '/plans'},
    {label: 'Area', href: '/area'},
    {label: 'Collection', href: '/collection'},
    {label: 'Customer', href: '/customer'},
    {label: 'Logout', href: '/logout'}
  ]
  return (
    <nav className='  p-6 rounded-lg w-32 bg-sky-600 space-y-5 '>
     <ul className='hover:text-sky-400'> <Link href='/'><AiOutlineHome/></Link></ul>
      <ul className='space-y-5'>
        {links.map(link => 
        <Link //'hover:text-sky-100 rounded-md transition-colors flex'
        key={link.href}
        className={classnames({
          'text-sky-100': link.href === currentPath,
          'text-zinc-950' : link.href !== currentPath,
          'hover:text-sky-400 transition-colors flex': true
          })}
        href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
