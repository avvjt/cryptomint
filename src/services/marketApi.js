import axios from "axios";

export const getMarkets = async () => {

    const res = await axios.get(
        "https://api.binance.com/api/v3/ticker/24hr"
    );

    return res.data;

};