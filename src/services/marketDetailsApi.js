import axios from "axios";

export async function getMarket(symbol) {

    const res = await axios.get(

        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`

    );

    return res.data;

}