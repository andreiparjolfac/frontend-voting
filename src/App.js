import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './constant';
import Login from "./Components/Login";
import Connected from './Components/Connected';

function App() {
  const [account, setAccount] = useState(null);
  const [balance,setBalance] = useState(0);
  const [isConnected,setIsConnected] = useState(false);

  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.on("accountsChanged",handleAccountsChanged);
    }
    return ()=>{
      if(window.ethereum){
        window.ethereum.removeListener("accountsChanged",handleAccountsChanged);
      }
    };
  });

  async function handleAccountsChanged(accounts){
    if(accounts.length === 0){
      console.log("Please connect to Metamask!");
      setAccount(null);
      setBalance(0);
      setIsConnected(false);
    }else if(accounts[0]!==account){
      setAccount(accounts[0]);
      const currentBalance = await getCurrentBalance(accounts[0]);
      setBalance(currentBalance);
    }
  }

  async function getCurrentBalance(signer){
    const balanceHexWei = await window.ethereum.request({method:"eth_getBalance",params:[signer,null]});
    const balanceETH = parseInt(balanceHexWei,16) / 1000000000000000000 ;

    return balanceETH;
  }

  async function connectToMetamask() {
    
      try {
        if (window.ethereum.isConnected() && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }).catch((err) => { if (err.code === 4001) { console.log("Please connect to metaMask!"); } else { console.error(err); } });

        const signer = accounts[0];
        setIsConnected(true);
        setAccount(signer);

        
        const balanceETH = await getCurrentBalance(signer);

        setBalance(balanceETH);
        }
      } catch (error) {
        console.error("Metamask is not detected in the browser");
        console.error(error);
      }
    
  }

  return (
    <div className="App">
      <h1>
        {isConnected ?
        (<Connected balance={balance} account={account}/>)
        :
        (<Login connectWallet={connectToMetamask} />) 
        }
      </h1>
    </div>
  );
}



export default App;
