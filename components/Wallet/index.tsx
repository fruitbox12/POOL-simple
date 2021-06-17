import { useState, useCallback, useEffect } from "react";
import useETHBalance from "../../hooks/useETHBalance";
import useERC20Balances from "../../hooks/useERC20Balances";
import usePTBalances from "../../hooks/usePTBalances";
import { useLogout, useUser } from "../../context/UserContext";
import { formatETH, formatERC20 } from "../../utils/format";

import Send from "../Send";
import Receive from "../Receive";
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
    // console.log('index', POOL.balance)
    return (
        <section className={styles.wallet}>
            <div className={styles.balance}>
                <span>Balances</span>
                <p className={styles.totalBalance}>
                    {formatETH(ethBalance)} ETH
                </p>
                <p className={styles.totalBalance}>
                    {formatERC20(POOL.balance, POOL.decimals)} POOL
                </p>
                <p className={styles.totalBalance}>
                    {formatERC20(PCUSDC.balance, PCUSDC.decimals)} Tickets
                </p>

                <span>Your Address</span>
                <CopyUserAddress address={user.address} color="blue" />
            </div>

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
