import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='h-screen w-full bg-slate-700 flex items-center justify-center'>{children}</div>
  )
}

export default Layout