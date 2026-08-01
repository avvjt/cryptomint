import { useEffect, useState } from "react";
import { getMarket } from "../services/marketDetailsApi";

export default function useMarket(symbol) {

    const [market, setMarket] = useState(null);

    useEffect(() => {

        async function load() {

            const data =
                await getMarket(symbol);

            setMarket(data);

        }

        load();

    }, [symbol]);

    return market;

}