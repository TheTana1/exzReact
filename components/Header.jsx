import {nav} from '../styles/Header.module.css'
import Link from 'next/link'


const pages = [
    {href:'/', name:''}
]

export function Header (){
    return <header>
        <nav className={nav}>
        <ul>
            {pages.map(page=>
               <li key={page.href}>
                <Link href={page.href}>{page.name} </Link>
               </li>     
            )}   
        </ul>
    </nav>
    <hr />
    </header>
}