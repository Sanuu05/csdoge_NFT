import React, { useEffect, useState } from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, ethers } from "ethers";

import logo from './1200.png'
// import Web3 from 'web3'
import { Modal, Button } from 'react-bootstrap'
let web3Modal;
let provider;
let selectedAccount;

// import Web3 from 'web3'
function init() {
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            // Mikko's test key - don't copy as your mileage may vary
            // infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
            rpc: {
                56:"https://bsc-dataseed.binance.org/"
              },
            chainId:56
          }
        },
    
        
      };

    web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });

    window.w3m = web3Modal;
}

async function fetchAccountData() {
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    selectedAccount = await signer.getAddress();
    console.log(selectedAccount);
    
    return selectedAccount;
}

async function refreshAccountData() {
    await fetchAccountData(provider);
}

async function onConnect() {
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect({ cacheProvider: true });
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        console.log('chainchan',accounts)
        fetchAccountData();
        // window.location.reload()
    });

    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
        window.location.reload()
    });

    provider.on("networkChanged", (networkId) => {
        fetchAccountData();
    });
    window.location.reload()

    await refreshAccountData();
}



async function disconnet() {
    console.log("Opening a dialog", web3Modal);
    try {
        // provider = await web3Modal.connect();
        

        await web3Modal.clearCachedProvider();
        // await window.ethereum.disable()
        window.location.reload()
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

   
}
const Header = ({change,web3m,provider1}) => {
    const [acc,setacc] = useState()
    const [isDarkMode, setIsDarkMode] = useState(() => true);
    console.log('dark', isDarkMode)
    const [accountid, setaccountid] = useState()
    useEffect(() => {
        // change()
        localStorage.setItem('dark', isDarkMode)

    }, [isDarkMode])
    useEffect(async () => {

        if (acc) {
            // const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // setaccountid(accounts1[0])
            provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            console.log('dddd',accounts)
            web3m(web3)
            provider1(provider)
            setaccountid(accounts[0])


        }


    }, [acc]);
    const [ndark, setndark] = useState()
    const dark = localStorage.getItem('dark')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [account, setAccount] = useState();
  
    useEffect(() => {
        init();
        change(false)
        if (web3Modal.cachedProvider) {
            console.log('accaa',web3Modal.cachedProvider)
            console.log("connected");
            setacc(true)
            change(true)
        }
    }, []);
    
    
    
 
    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <a className="navlogo" href="/">
                        <img className="navbar-brand-sticky" src={logo} alt="sticky brand-logo" />
                    </a>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="/explore-1">Explore</a>
                        </li>

                        <li className="nav-item">
                            <a href="/create" className="nav-link">Create</a>
                        </li>
                        <li className="nav-item">
                            <a href="/mycollection" className="nav-link">My Collections</a>
                        </li>
                        <li className="nav-item">
                            <a href="/csdoge" className="nav-link">CS DOGE</a>
                        </li>

                    </ul>
                    {/* Navbar Icons */}
                    <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="fas fa-search" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        <li className="nav-item ml-3">
                        {/* { accountid?
                               <a className="btn ml-lg-auto btn-bordered-white" onClick={disconnet} style={{fontSize:'7px',width:'180px',wordBreak:'break-all'}}>{accountid}<span style={{color:'red'}} >(logout)</span></a>:<a onClick={onConnect} className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />Wallet Connect</a>
                               
                           } */}
                        {/* {  acc || accountid ?
                               <a className="btn ml-lg-auto btn-bordered-white" onClick={disconnet} style={{fontSize:'11px',width:'180px',wordBreak:'break-all'}}>{accountid?.slice(0,5)}.....{accountid?.slice(-5)}<br/><span style={{color:'red'}} >Logout</span></a>:<a onClick={onConnect} className="btn ml-lg-auto btn-bordered-white">Wallet Connect</a>
                               
                           } */}
                             {  acc ?
                             <>  <a className="btn btncon ml-lg-auto btn-bordered-white" style={{fontSize:'15px',width:'180px',wordBreak:'break-all'}}>{accountid?.slice(0,3)}.....{accountid?.slice(-3)}<br/></a>
                             <a onClick={disconnet}  className="btnlog btn ml-lg-2 btn-bordered-white">Logout</a>
                             </>:<a onClick={onConnect} className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />Wallet Connect</a>
                               
                           }
                            {/* <button onClick={connectWallet} className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />Wallet Connect</button> */}
                        </li>
                    </ul>
                </div>
                
                 <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <h3>Connect To Wallets</h3>
                        <button style={{borderRadius:'5px',border:'none',padding:'5px 10px',outline:"none"}} onClick={onConnect} ><img src="https://metamask.io/images/mm-logo.svg" className="img-fluid"/></button>
                    </div>

                </Modal.Body>
            </Modal>
            </nav>
        </header>
    );
};

export default Header;