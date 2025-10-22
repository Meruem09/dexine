import React from 'react'

export default function Navbar() {

    const links = [
        {
            title: "Guide",
            href: "#",
        },
                {
            title: "Pricing",
            href: "#",
        },
                {
            title: "Login",
            href: "#",
        },

    ]


  return (
    <div className='root-navbar'>
        <div className='logo'>Fintech</div>
        <div className='links'>
            {links.map((link, idx) => (<a className='link-items' key={link.title} href={link.href}>{link.title} </a>))}
            <button className='btn'>Start free trial</button>
        </div>
    </div>
  )
}
