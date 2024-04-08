import React from "react";

const Connected = (props)=>{
    return(
        <div className="connected-container">
            <h1 className="connected-header">You are connected to MetaMask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            <p className="connected-account">Balance: {props.balance} ETH </p>
        </div>
    );
}

export default Connected;