import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
// import { TokenWithBalance, Token } from "../interfaces/tokens";
import { getPTBalances } from "../utils/balances";

const usePTBalances = (): [any , any, () => Promise<void>] => {
    console.log('called usePTBalances')
    const user = useUser();
    const [POOL, setPOOL] = useState<any>(0);
    const [PCUSDC, setPCUSDC] = useState<any>(0);

    const fetchUserPT = async () => {
        if (!user) { 
            setPOOL(0);
            setPCUSDC(0);
            return;
        }
        try {
            const tokensBalance = await getPTBalances(user.provider);
            setPOOL(tokensBalance.find(token => token.symbol === "POOL"));
            setPCUSDC(tokensBalance.find(token => token.symbol === "PCUSDC"));

        } catch (err) {
            setPOOL(0);
            setPCUSDC(0);
        }
    };

    useEffect(() => {
        fetchUserPT();
    }, [user?.provider]);
    return [POOL, PCUSDC, fetchUserPT];
};

export default usePTBalances;
