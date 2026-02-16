export default function Footer() {
    return (
        <div className="flex flex-col bg-black rounded-2xl m-8 p-4 shadow-2xl shadow-black/40">
            <div className="flex flex-col items-end justify-center w-full">
                <grid className=" bg-amber-800 grid-cols-5 w-full flex justify-around ">
                    {/* 1st grid */}
                    
                        <div className="flex bg-amber-300 justify-center">
                            <img
                                src="./src/assets/logo.png"
                                className="h-10 w-auto"
                                alt="logo"
                            >
                            </img>
                            <p className="text-white">Trading</p>
                        </div>
                    

                    {/* 2nd grid */}
                    <div className="items-center bg-amber-500 flex flex-col">

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

                    {/* 5th grid */}
                    <div className="items-center bg-amber-500 flex flex-col">

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

                </grid>

                <span className="
                w-full
                bg-amber-500
                        inline-block
                        text-white
                        text-[22vw]
                        font-extrabold
                        leading-[0.85]
                        tracking-[-0.04em]
                        px-[4vw]
                        py-[1.5vw]
                        rounded-[3vw]
">
                    NOICE
                </span>


            </div>
        </div>
    )
}