import { HeroUIProvider } from "@heroui/react";


function HomeHero() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="text-black text-5xl font-extrabold">Trade CFDs with the worlds No.1 provider1</h1>
                <h4 className="text-black text-xl font-medium py-4">Earn up to $150 in cashback on your first trades.</h4>
            </div>
            <div className="justify-center space-x-2">
                <button className="bg-red-600 text-white px-6 py-2 rounded-4xl text-lg font-medium hover:bg-red-700 transition duration-300 shadow-2xl">Start Trading</button>
                <button className="bg-white text-black px-6 py-2 rounded-4xl text-lg font-medium hover:bg-neutral-100 transition duration-300 shadow-2xl border">Start Trading</button>
            </div>

            <p className="py-6">
                Got questions? Chat with us anytime via{" "}
                <a
                    href="#"
                    className="text-red-500 hover:underline"
                >
                    web chat
                </a>{" "}
                or{" "}
                <a
                    href="https://wa.me/9741576171"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline"
                >
                    WhatsApp
                </a>{" "}
                to get started.
            </p>


        </div>
    );
}

export default HomeHero;