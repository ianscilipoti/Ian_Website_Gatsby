import React from 'react'
import { Link } from 'gatsby'
import {logoText} from './header.module.scss'

const Header = () => {
    return <header>
        <h1 className={logoText}>IAN SCILIPOTI</h1>
        <ul>
            <li><Link to="/contact">Contact Me</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/">About Me</Link></li>
        </ul>
  </header>
    
}

export default Header