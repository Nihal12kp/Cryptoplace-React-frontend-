import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [Currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    });

    const fetchAllCoin = async () => {
        const options = {
            method: "GET",
            headers: { accept: "application/json", "x-cg-demo-api-key": "CG-BGt5PxWXhq4iMBtKVAFJV5Lk" },
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency.name}`, options)
            .then((res) => res.json())
            .then((res) => setAllCoin(res))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchAllCoin();
    }, [Currency]);

    const ContextValue = { allCoin, Currency, setCurrency };

    return <CoinContext.Provider value={ContextValue}>{props.children}</CoinContext.Provider>;
};

export default CoinContextProvider;
