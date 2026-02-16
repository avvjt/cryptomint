function Save() {
    return (
        <>

            {/* Navbar hover sheet */}
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
        </>
    );
}