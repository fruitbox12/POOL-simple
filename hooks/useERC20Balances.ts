import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { TokenWithBalance } from "../interfaces/tokens";
import { getTokensBalances } from "../utils/balances";

const useERC20Balances = (): [TokenWithBalance[], BigNumber, () => Promise<void>] => {
    const user = useUser();
    const [balances, setBalance] = useState<TokenWithBalance[]>([]);
    const [poolBalance, setPoolBalance] = useState<BigNumber>(BigNumber.from(0));

    const fetchUserErc20 = async () => {
        if (!user) {
            setBalance([]);
            return;
        }
        try {
            const tokensBalance = await getTokensBalances(user.provider);
            const poolTokenBalance = tokensBalance.filter((token) => token.symbol === "UNI")
            setBalance(tokensBalance);
            setPoolBalance(poolTokenBalance[0].balance)
        } catch (err) {
            setBalance([]);
        }
    };

    useEffect(() => {
        fetchUserErc20();
    }, [user?.provider]);

    return [balances, poolBalance, fetchUserErc20];
};

export default useERC20Balances;
