import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        < div className="rounded-t-2xl bg-white shadow-black/30 transition-shadow" >
            <nav className="flex px-6 py-4 z-40 items-center transition-all duration-300 justify-between">
                <img
                    src="./src/assets/logo.png"
                    className="h-10 sm:h-14 w-auto cursor-pointer"
                    alt="logo"
                />

                <div className=" hidden md:flex space-x-4 w-full justify-center">
                    <div className="relative group">
                        <a
                            href="/home" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black
"
                        >
                            Home
                        </a>


                        <div className="fixed left-0 right-0
                                        bg-white rounded-b-xl
                                        shadow-lg shadow-black/30
                                        my-2

                                        opacity-0 translate-y-2
                                        pointer-events-none

                                        transition-all duration-300 ease-out

                                        group-hover:opacity-100
                                        group-hover:translate-y-0
                                        group-hover:pointer-events-auto">
                            <grid className="grid-cols-4 gap-10  px-10 py-10 flex justify-center">
                                {/* 1st grid */}
                                <div className=" ">
                                    <div className="flex items-center">
                                        <img
                                            src="./src/assets/logo.png"
                                            className="h-10 w-auto"
                                            alt="logo"
                                        >
                                        </img>
                                        <p>Trading</p>
                                    </div>
                                </div>

                                {/* 2nd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>
                                </div>


                                {/* 3rd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>


                                </div>

                                {/* 4th grid */}
                                <div className="relative items-center flex flex-col">


                                    <img
                                        src="./src/assets/logo.png"
                                        alt="sheetLogo"
                                        className="w-50 h-50" />

                                    <div className="absolute inset-0 justify-center flex items-center">
                                        <div className="flex flex-col items-center">
                                            <h2>HoverSheet image text</h2>
                                            <button className="bg-white shadow-2xl px-3 py-1 rounded-2xl cursor-pointer hover:bg-amber-800">Click on me!</button>
                                        </div>

                                    </div>

                                </div>

                            </grid>
                        </div>

                    </div>

                    <div className="relative group">
                        <a href="/about" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            About</a>
                        <div className="fixed left-0 right-0
    bg-white rounded-b-xl
    shadow-lg shadow-black/30
    my-2

    opacity-0 translate-y-2
    pointer-events-none

    transition-all duration-300 ease-out

    group-hover:opacity-100
    group-hover:translate-y-0
    group-hover:pointer-events-auto">
                            <grid className="grid-cols-4 gap-10  px-10 py-10 flex justify-center">
                                {/* 1st grid */}
                                <div className=" ">
                                    <div className="flex items-center">
                                        <img
                                            src="./src/assets/logo.png"
                                            className="h-10 w-auto"
                                            alt="logo"
                                        >
                                        </img>
                                        <p>Trading</p>
                                    </div>
                                </div>

                                {/* 2nd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>
                                </div>


                                {/* 3rd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>


                                </div>

                                {/* 4th grid */}
                                <div className="relative items-center flex flex-col">


                                    <img
                                        src="./src/assets/logo.png"
                                        alt="sheetLogo"
                                        className="w-50 h-50" />

                                    <div className="absolute inset-0 justify-center flex items-center">
                                        <div className="flex flex-col items-center">
                                            <h2>HoverSheet image text</h2>
                                            <button className="bg-white shadow-2xl px-3 py-1 rounded-2xl cursor-pointer hover:bg-amber-800">Click on me!</button>
                                        </div>

                                    </div>

                                </div>

                            </grid>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="/course" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            Course</a>
                        <div className="fixed left-0 right-0
    bg-white rounded-b-xl
    shadow-lg shadow-black/30
    my-2

    opacity-0 translate-y-2
    pointer-events-none

    transition-all duration-300 ease-out

    group-hover:opacity-100
    group-hover:translate-y-0
    group-hover:pointer-events-auto">
                            <grid className="grid-cols-4 gap-10  px-10 py-10 flex justify-center">
                                {/* 1st grid */}
                                <div className=" ">
                                    <div className="flex items-center">
                                        <img
                                            src="./src/assets/logo.png"
                                            className="h-10 w-auto"
                                            alt="logo"
                                        >
                                        </img>
                                        <p>Trading</p>
                                    </div>
                                </div>

                                {/* 2nd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>
                                </div>


                                {/* 3rd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>


                                </div>

                                {/* 4th grid */}
                                <div className="relative items-center flex flex-col">


                                    <img
                                        src="./src/assets/logo.png"
                                        alt="sheetLogo"
                                        className="w-50 h-50" />

                                    <div className="absolute inset-0 justify-center flex items-center">
                                        <div className="flex flex-col items-center">
                                            <h2>HoverSheet image text</h2>
                                            <button className="bg-white shadow-2xl px-3 py-1 rounded-2xl cursor-pointer hover:bg-amber-800">Click on me!</button>
                                        </div>

                                    </div>

                                </div>

                            </grid>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="/resourse" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            Resourse</a>
                        <div className="fixed left-0 right-0
    bg-white rounded-b-xl
    shadow-lg shadow-black/30
    my-2

    opacity-0 translate-y-2
    pointer-events-none

    transition-all duration-300 ease-out

    group-hover:opacity-100
    group-hover:translate-y-0
    group-hover:pointer-events-auto">
                            <grid className="grid-cols-4 gap-10  px-10 py-10 flex justify-center">
                                {/* 1st grid */}
                                <div className=" ">
                                    <div className="flex items-center">
                                        <img
                                            src="./src/assets/logo.png"
                                            className="h-10 w-auto"
                                            alt="logo"
                                        >
                                        </img>
                                        <p>Trading</p>
                                    </div>
                                </div>

                                {/* 2nd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>
                                </div>


                                {/* 3rd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>


                                </div>

                                {/* 4th grid */}
                                <div className="relative items-center flex flex-col">


                                    <img
                                        src="./src/assets/logo.png"
                                        alt="sheetLogo"
                                        className="w-50 h-50" />

                                    <div className="absolute inset-0 justify-center flex items-center">
                                        <div className="flex flex-col items-center">
                                            <h2>HoverSheet image text</h2>
                                            <button className="bg-white shadow-2xl px-3 py-1 rounded-2xl cursor-pointer hover:bg-amber-800">Click on me!</button>
                                        </div>

                                    </div>

                                </div>

                            </grid>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="/contact" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black group-hover:text-black">
                            Contact us</a>
                        <div className="fixed left-0 right-0
                                        bg-white rounded-b-xl
                                        shadow-lg shadow-black/30
                                        my-2

                                        opacity-0 translate-y-2
                                        pointer-events-none

                                        transition-all duration-300 ease-out

                                        group-hover:opacity-100
                                        group-hover:translate-y-0
                                        group-hover:pointer-events-auto">
                            <grid className="grid-cols-4 gap-10  px-10 py-10 flex justify-center">
                                {/* 1st grid */}
                                <div className=" ">
                                    <div className="flex items-center">
                                        <img
                                            src="./src/assets/logo.png"
                                            className="h-10 w-auto"
                                            alt="logo"
                                        >
                                        </img>
                                        <p>Trading</p>
                                    </div>
                                </div>

                                {/* 2nd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>
                                </div>


                                {/* 3rd grid */}
                                <div className="items-center flex flex-col">

                                    <p className="text-gray-700 text-sm font-semibold py-4"> How to trade</p>
                                    <a href="/home/option1" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Forex
                                    </a>
                                    <a href="/home/option2" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Stocks
                                    </a>
                                    <a href="/home/option3" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Crypto
                                    </a>
                                    <a href="/home/option4" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Commodities
                                    </a>
                                    <a href="/home/option5" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Indices
                                    </a>
                                    <a href="/home/option6" className="text-gray-600 hover:text-black hover:underline text-sm font-semibold py-1">
                                        Options
                                    </a>


                                </div>

                                {/* 4th grid */}
                                <div className="relative items-center flex flex-col">


                                    <img
                                        src="./src/assets/logo.png"
                                        alt="sheetLogo"
                                        className="w-50 h-50" />

                                    <div className="absolute inset-0 justify-center flex items-center">
                                        <div className="flex flex-col items-center">
                                            <h2>HoverSheet image text</h2>
                                            <button className="bg-white shadow-2xl px-3 py-1 rounded-2xl cursor-pointer hover:bg-amber-800">Click on me!</button>
                                        </div>

                                    </div>

                                </div>

                            </grid>
                        </div>
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