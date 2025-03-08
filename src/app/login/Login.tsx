
'use client'
import gsap from "gsap";
import { useEffect } from "react";

const Login = () => {
    useEffect(() => {
      
        gsap.set('.gradDot', { x: -200, y: -200, opacity: 0 });
        gsap.to('.gradDot', {
            x: 0,
            y: 0,
            opacity: 0.6,
            duration: 0.7,
        });
    }, [])
    

  return (
    <main className="loginpage relative w-screen h-screen flex justify-center items-center bg-gray-950">
        <div className="absolute top-0 gradDot w-[400px] h-[400px] rounded-full bg-violet-600 blur-[150px] opacity-60 "></div>
        <div className="w-full flex items-center justify-center z-10">
            <div className="w-[600px] h-[600px] bg-white"></div>
        </div>
        <div className="w-full flex justify-center items-center">
        <div className="flex flex-col items-center bg-gray-50/5 backdrop-blur-2xl border border-white/10 w-[500px] h-[600px] p-8 rounded-3xl shadow-lg">
        </div>
        </div>
        
    </main>
  )
}

export default Login