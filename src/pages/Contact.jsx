export default function Contact() {
    return (
        <>

            {/* Main container */}
            <div className="rounded-t-2xl bg-white min-h-screen">
                <nav className="flex px-6 py-4 z-40 items-center transition-all duration-300">
                    <img
                        src="./src/assets/logo.png"
                        className="h-10 sm:h-14 w-auto cursor-pointer"
                        alt="logo"
                    />
                    <div className="flex ml-6 space-x-4 w-full justify-center">
                        <a href="/home" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                            Home</a>
                        <a href="/about" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                            About us</a>
                        <a href="/course" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                            Course</a>
                        <a href="/resourse" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                            Resourse</a>
                        <a href="/contact" className="text-gray font-semibold text-sm lg:text-base cursor-pointer hover:underline hover:text-black">
                            Contect us</a>
                    </div>
                    <button>
                        <menu-icon class="w-6 h-6 text-black" icon="menu"></menu-icon>
                    </button>
                </nav>
            </div>
        </>

    )
}