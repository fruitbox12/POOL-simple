import { useState, useCallback, useEffect } from "react";
import useETHBalance from "../../hooks/useETHBalance";
import useERC20Balances from "../../hooks/useERC20Balances";
import usePTBalances from "../../hooks/usePTBalances";
import { useLogout, useUser } from "../../context/UserContext";
import { formatETH, formatERC20 } from "../../utils/format";

import Send from "../Send";
import Receive from "../Receive";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import CopyUserAddress from "../CopyUserAddress/CopyUserAddress";

import styles from "./Wallet.module.scss";

const Wallet = (): JSX.Element | null => {
    const [send, setSend] = useState(false);
    const [receive, setReceive] = useState(false);
    const user = useUser();
    const logout = useLogout();

    const [ethBalance, reloadEth] = useETHBalance();
    const [balances, fetchUserErc20] = useERC20Balances();
    const [POOL, PCUSDC, fetchUserPT] = usePTBalances();

    /** Reloader function  */
    const reloader = useCallback(() => {
        reloadEth();
        fetchUserErc20();
        fetchUserPT();
    }, [reloadEth, fetchUserErc20, fetchUserPT]);

    /** Reload these every 15 sec */
    useEffect(() => {
        const timeout = setTimeout(() => reloader(), 15000);
        return () => { clearTimeout(timeout)};
    }, [reloader]);
 
    if (!user) {
        return null;
    }

    if (send) {
        return <Send goBackToWallet={() => setSend(false)} />;
    }

    if (receive) {
        return <Receive goBackToWallet={() => setReceive(false)} />;
    }

    const Ramp = () => {

        const rampDiv = document.getElementById('ramp-container')
        
        new RampInstantSDK({
            hostAppName: 'POOL Simple',
            hostLogoUrl: 'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
            swapAmount: '100000000',
            swapAsset: 'USDC',
            userAddress: user.address,
            userEmailAddress: user.email,
            containerNode: rampDiv!,
            url: 'https://ri-widget-staging.firebaseapp.com/', // only specify the url if you want to use testnet widget versions,
            // use variant: 'auto' for automatic mobile / desktop handling,
            // 'hosted-auto' for automatic mobile / desktop handling in new window,
            // 'mobile' to force mobile version
            // 'desktop' to force desktop version (default)
            variant: 'auto', 
        })
        .on('*', console.log)
        .show();
    
    }

    return (
        <section className={styles.wallet}>
            <div className={styles.balance}>
                <span>Your Address</span>
                <CopyUserAddress address={user.address} color="blue" 
                />
                <span>(Click to Copy)</span> 

                <span>Balances</span>
                <p className={styles.totalBalance}>
                    {formatETH(ethBalance)} ETH
                <span>(ETH is required to send Tokens to another address)</span>
                </p>

                <span>Governance Tokens</span>
                <p className={styles.totalBalance}>
                    {formatERC20(POOL.balance, POOL.decimals)} POOL
                <span>(If you have these, you can vote on PoolTogether Changes)</span>
                </p>
                
                <p className={styles.totalBalance}>
                    <span>Tickets</span>
                    {formatERC20(PCUSDC.balance, PCUSDC.decimals)} pcUSDC
                    <span>(1 pcUSDC = $1 USD = 1 Ticket)</span>
                </p>
            </div>

            <div id="ramp-container"></div>

            <div className={styles.main}>
                <button onClick={reloader} className={styles.reloadBtn}>
                    Reload Quantities
                </button>
                <div className={styles.quantity}>
                    {balances.map((token) => (
                        <div key={token.symbol}>
                            {token.balance.gt(0) && (
                                <div className={styles.quantity__item}>
                                    <img
                                        alt={`${token.name} Logo`}
                                        src={token.logoURI}
                                    />
                                    <div>
                                        <span>
                                            {formatERC20(
                                                token.balance,
                                                token.decimals,
                                            )}{" "}
                                            {token.symbol}
                                        </span>
                                        {/* <small>$150 USD</small> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => setSend(true)}>Send</button>
                <button onClick={() => setReceive(true)}>Receive</button>
                <button onClick={Ramp}>Buy</button>
            </div>
            <div className={styles.logoutContainer}>
                <button className={styles.logout} onClick={logout}>
                    Logout
                </button>
            </div>
        </section>
    );
};

export default Wallet;
