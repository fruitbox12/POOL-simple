import { ethers, providers } from "ethers";
import BalanceCheckerABI from "../abi/eth-balance-checker.abi.json";
import { Token, TokenWithBalance } from "../interfaces/tokens";
import { activeNetwork } from "../context/UserContext";
// This code uses the Smart Contract from: https://github.com/wbobeirne/eth-balance-checker

let BALANCE_CHECKER_ADDRESS: any

const checkNetwork = (network: string) => {
    if (network === "rinkeby") {
        BALANCE_CHECKER_ADDRESS = "0x3183B673f4816C94BeF53958BaF93C671B7F8Cf2"
    } else if (network === "ropsten") {
        BALANCE_CHECKER_ADDRESS = "0x8D9708f3F514206486D7E988533f770a16d074a7"
    } else {
        BALANCE_CHECKER_ADDRESS = "0xb1f8e55c7f64d203c1400b9d8555d050f94adf39"
    }
}
checkNetwork(activeNetwork)
    
export const getEthersBalances = async (
    provider: providers.JsonRpcProvider,
    addresses: string[],
    tokens: Token[],
): Promise<TokenWithBalance[]> => {
    const parseableTokens = tokens.map((token) => token.address);
    // Generate Contract
    const contract = new ethers.Contract(
        BALANCE_CHECKER_ADDRESS,
        BalanceCheckerABI,
        provider
    );

    // console.log(`eth-balance-checker provider`, contract)

    // Query contract
    const balances = await contract.balances(addresses, parseableTokens);
    // console.log(`balances`, balances)

    const merged = tokens
        .map((token, index) => ({ ...token, balance: balances[index] }))
        .sort((a, b) => {
            if (a.balance.eq(b.balance)) {
                return 0;
            }
            return a.balance.gt(b.balance) ? -1 : 1;
        });

    // Return values
    return merged;
};
