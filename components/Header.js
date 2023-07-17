'use client'

import { Navbar } from 'flowbite-react';

export default function Header() {
  return (
 <header className='sticky top-0'>
     <Navbar
      fluid
      rounded
      className='bg-green-400'
    >
      <Navbar.Brand
      
        // href="https://flowbite-react.com"
      >
        {/* <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="/favicon.svg"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold text-red-800">
         Servicom
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link
      
          href="#"
        >
          <p>
            About
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          Services
        </Navbar.Link>
        <Navbar.Link href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
 </header>
  )
}


