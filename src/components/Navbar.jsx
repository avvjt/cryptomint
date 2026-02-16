import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        < div className="rounded-t-2xl bg-white shadow-black/30 transition-shadow" >
            <nav className="flex px-6 py-2 items-center max-w-7xl transition-all duration-300 justify-between
            bg-yellow-400">
                <div>
                    <img
                        src="./src/assets/logo.png"
                        className="h-10 sm:h-14 w-auto cursor-pointer"
                        alt="logo"
                    />
                </div>


                <div className=" hidden md:flex space-x-4 w-full justify-center">
                    <div className="relative group">
                        <a
                            href="/home" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black
"
                        >
                            Home
                        </a>



                    </div>

                    <div className="relative group">
                        <a href="/about" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            About</a>

                    </div>
                    <div className="relative group">
                        <a href="/course" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            Course</a>

                    </div>
                    <div className="relative group">
                        <a href="/resourse" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            Resourse</a>

                    </div>
                    <div className="relative group">
                        <a href="/contact" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            Contact us</a>

                    </div>
                </div>
                <button className="md:hidden cursor-pointer"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? (
                        <X className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                    ) : (
                        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}

                </button>


            </nav>
            {isOpen && (<div className=" md:hidden items-center border-t animate-in slide-in-from-top duration-300">
                <div className="items-center">
                    <a href="/home"
                        className="block text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                        Home</a>
                    <a href="/about" className="block text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                        About us</a>
                    <a href="/course" className="block text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                        Course</a>
                    <a href="/resourse" className="block text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                        Resourse</a>
                    <a href="/contact" className="block text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                        Contect us</a>
                </div>
            </div>)}
        </div >
    );




}