import React from 'react'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>  
            <div className='min-h-screen bg-[#111827]'>
            <header className=''>
                <HeaderComponent />
            </header>
            <main className='pt-28 pb-28'>
                <Outlet />
            </main>
            <footer>
                <FooterComponent />
            </footer>
            </div>
        </>
    )
}

export default Layout