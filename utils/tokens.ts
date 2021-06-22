import { Token, TokenList } from "../interfaces/tokens";

/**
 * Fetch Tokens
 * Currently uses Uniswap Public Worker (Ty Uni!)
 *
 * In the future we should upgrade this to use Token Lists
 * https://tokenlists.org/
 */
export const fetchTokens = async (): Promise<Token[]> => {
    console.log('called tokens_fetchTokens')
    const res = await fetch(
        "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link",
    );
    const data: TokenList = await res.json();
    return data?.tokens;
};

export const fetchCoinGeckoTokens = async (): Promise<Token[]> => {
    console.log('called tokens_fetchCoinGeckoTokens')
    const res = await fetch(
        "https://tokens.coingecko.com/uniswap/all.json", {
            mode:'cors',
            method: "GET",
            headers: {
              "Content-Type": "application/json"
           }
        
        });
    const data: TokenList = await res.json();
    return data?.tokens;
};
