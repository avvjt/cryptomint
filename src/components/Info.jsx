import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Ticker from "./Ticker";

export default function Info() {
    // read initial value from localStorage
    const [isOpen, setIsOpen] = useState(() => {
        return localStorage.getItem("infoClosed") !== "true";
    });

    // persist when user closes it
    useEffect(() => {
        if (!isOpen) {
            localStorage.setItem("infoClosed", "true");
        }
    }, [isOpen]);

    if (!isOpen) {
        return <Ticker />;
    }

    return (
        <div className="px-4 py-4 bg-black z-50 flex items-center">
            <p className="text-white text-center text-sm flex justify-center w-full">
                The Trading With Data Science Program aims to help you learn and
                apply the knowledge and skills of a professional trader, with the
                potential for profitable outcomes.
            </p>

            <X
                onClick={() => setIsOpen(false)}
                className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-110 ml-auto bg-black text-white font-extrabold mr-4"
            />
        </div>
    );
}
