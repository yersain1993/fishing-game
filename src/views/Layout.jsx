import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-cyan-950 h-full min-h-screen">
        <Header/>
        <Main/>
    </div>
  )
}

export default Layout