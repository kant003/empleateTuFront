import React, { useContext, useState } from 'react'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import { Outlet } from 'react-router-dom'
import { CursorProgressContext } from '../contexts/cursorProgressContext'

function Layout() {
    const [cursorProgress, setCursorProgress] = useState(false)
    return (
        <>  
             <CursorProgressContext.Provider value={{cursorProgress, setCursorProgress}}>
                <div className={`min-h-screen bg-[#111827] ${cursorProgress&&"cursor-progress"}`}>
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
            </CursorProgressContext.Provider>
        </>
    )
}

export default Layout