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
    <div ref={navContainerRef} className='fixed inset-x-2 top-4 z-50 h-16 sm:inset-x-6 rounded-4xl from-gray-900/40 to-gray-600/60 bg-gradient-to-r backdrop-blur-3xl shadow-lg border border-white/20 '>
        <div className='flex justify-between items-center h-full px-8'>
            <div className='text-white font-geo font-medium text-2xl'>SecureConnect.</div>
            <div className='flex items-center space-x-4'>
                {isSigned? <Button id='login' title='Sign up' containerClass='text-white' /> : <Button id='login' title='Sign up' containerClass='text-white' />}

            </div>
        </div>
    </div>
  )
}

export default Navbar