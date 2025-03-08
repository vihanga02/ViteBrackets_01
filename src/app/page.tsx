/* eslint-disable @typescript-eslint/no-unused-vars */

//install dependencies
//npm install gsap
//npm install prop-types
//npm install clsx

'use client'
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import Typewriter from "./components/Typewriter";
import Link from "next/link";



export default function Home() {
  

  const [isSigned, setIsSigned] = useState(false)

 


  const headerRef = useRef(null);
  useEffect(() => {
    
    if (localStorage.getItem('isSigned') === 'true') {
      setIsSigned(true);
      
    }

    gsap.set('.gradDot', { x: -200, y: -200, opacity: 0 });
    gsap.to('.gradDot', {
      x: 0,
      y: 0,
      opacity: 0.6,
      duration: 0.7,
    });

    gsap.set(headerRef.current, { scale: 0.97 , opacity: 0 });
    gsap.to(headerRef.current, {
      scale: 1,
      opacity: 1,
      duration:
        0.7,
    });
    
  }, [])
  

  return (
    <main className="relative w-screen h-screen flex flex-col justify-center items-center bg-gray-950 ">
      <Navbar isSigned={isSigned} />
      <img className="absolute z-0 opacity-5 w-full h-full" src="/images/grid.png" alt=""/>
      <div className="absolute top-0 gradDot w-[400px] h-[400px] rounded-full bg-violet-600 blur-[150px] opacity-60 "></div>
      {!isSigned ? (<div ref={headerRef} className="flex flex-col text-center items-center justify-center">
        <div className="text-gray-300 font-poppins text-4xl lg:text-6xl select-none z-20 w-7/10 text-center transition-all duration-500">“Seamless, Secure, and Simple”</div>
        <div className="text-[#ffffff] font-poppins font-bold text-6xl lg:text-9xl select-none z-20 w-7/10 text-center transition-all duration-500">WELCOME</div>
        
        <Typewriter text="Sign up now to get started!" speed={100} containerClass="font-space-mono text-[#90e0ef] lg:text-3xl select-none mt-4 transition-all duration-500"/>
        <div className="signButtons flex space-x-4 mt-8">
          <Link href="/auth/login"><Button id="login" title="Sign up" containerClass="text-white bg-gradient-to-r from-indigo-300 to-purple-400 border-none w-36 h-12 transition-all duration-500"/></Link>         
          
        </div>
      </div>) : (
        <div ref={headerRef} className="flex flex-col items-center space-y-1">
          <div className="text-white font-poppins font-bold text-4xl sm:text-7xl select-none">Congratulations, user  </div>
          <Typewriter text="Securely Connected!" speed={100} containerClass="text-[#90e0ef]" />
      </div>
    )} 
      
    <footer className="w-full h-32 flex justify-center items-center z-50">
      <div className="absolute bottom-0 w-full flex justify-center items-center text-white bg-gray-950 text-sm font-poppins">
        <p>&copy; 2025 SecureConnect. All rights reserved.</p>
      </div>
    </footer>
      
    </main>
  );
}