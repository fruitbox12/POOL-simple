import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
// import { useEffect } from 'react';
import Wallet from '../Wallet';

const Ramp = () => {

    const rampDiv = document.getElementById('ramp-container')
    
    new RampInstantSDK({
        hostAppName: 'POOL Simple',
        hostLogoUrl: 'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
        swapAmount: '10000000000000000',
        swapAsset: 'ETH',
        userAddress: '0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58',
        containerNode: rampDiv!,
        //  as HTMLElement,
        url: 'https://ri-widget-staging.firebaseapp.com/', // only specify the url if you want to use testnet widget versions,
        // use variant: 'auto' for automatic mobile / desktop handling,
        // 'hosted-auto' for automatic mobile / desktop handling in new window,
        // 'mobile' to force mobile version
        // 'desktop' to force desktop version (default)
        variant: 'auto', 
    })
    .on('*', console.log)
    .show();

    return(
        <Wallet/>
    );  
}


export default Ramp