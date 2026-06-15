import {
    Home,
    CandlestickChart,
    ArrowUpDown,
    Wallet,
} from "lucide-react";
import useScrollDirection from "../../hooks/useScrollDirection";

import { NavLink } from "react-router-dom";

export default function MobileBottomNav() {
    const visible = useScrollDirection();
    return (
        <nav
            className={`fixed
      bottom-0
      left-0
      right-0
      z-50
      bg-black
      border-t
      border-zinc-800
      transition-transform
      duration-300
      ${visible ? "translate-y-0" : "translate-y-full"}`}
        >
            <div className="grid grid-cols-5 py-2">

                <NavLink
                    to="/"
                    className="flex flex-col items-center"
                >
                    <Home size={20} />
                    <span className="text-xs">Home</span>
                </NavLink>

                <NavLink
                    to="/markets"
                    className="flex flex-col items-center"
                >
                    <CandlestickChart size={20} />
                    <span className="text-xs">Markets</span>
                </NavLink>

                <NavLink
                    to="/trade"
                    className="flex flex-col items-center"
                >
                    <ArrowUpDown size={20} />
                    <span className="text-xs">Trade</span>
                </NavLink>

                <NavLink
                    to="/futures"
                    className="flex flex-col items-center"
                >
                    <CandlestickChart size={20} />
                    <span className="text-xs">Futures</span>
                </NavLink>

                <NavLink
                    to="/assets"
                    className="flex flex-col items-center"
                >
                    <Wallet size={20} />
                    <span className="text-xs">Assets</span>
                </NavLink>

            </div>
        </nav>
    );
}