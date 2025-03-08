/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import gsap from "gsap";
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'

interface NavbarProps {
    isSigned: boolean;
  }

const Navbar: React.FC<NavbarProps> = ({ isSigned }) => {
    const navContainerRef = useRef(null)
        
        useEffect(() => {
                gsap.set(navContainerRef.current, { y: -50, opacity: 0 });
              
                gsap.to(navContainerRef.current, {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  delay: 0.2
                });  
        }
        , [])

    


  return (
    <div ref={navContainerRef} className='fixed inset-x-2 top-4 z-50 h-16 sm:inset-x-36 rounded-4xl bg-white/5 backdrop-blur-lg shadow-lg'>
        <div className='flex justify-between items-center h-full px-8'>
            <div className='text-white font-geo font-medium text-2xl'>SecureConnect</div>
            <div className='flex items-center space-x-4 z-50'>
                {isSigned? <Button id='login' title='Explore' containerClass='text-white bg-white/2' /> : <Button id='login' title='Explore' containerClass='text-white bg-transparent' />}

            </div>
        </div>
    </div>
  )
}

export default Navbar