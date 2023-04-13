import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'


import { addrs } from '../../abi/address'
import { Link } from 'react-router-dom';
import { useMoralis, useMoralisQuery } from "react-moralis";

function Collections({acc,web3main}) {
    const [colllist, setcolllist] = useState()
    const [active, setactive] = useState('sales')
    const [alldata, setalldata] = useState([])
    const [show, setshow] = useState(false)
    const { Moralis } = useMoralis();
    const [spi, setspin] = useState()
    const [accountid, setaccountid] = useState()
    const dataa = useMoralisQuery('CREATECSDOGECOL')
    console.log('addfff', dataa?.data)
    const [chainid,setchainid] = useState()

    useEffect(async () => {
        if(acc && web3main){
            const accounts1 = await web3main.eth.getAccounts();
        setaccountid(accounts1[0])
        totalcolection()
    }

    }, [acc,web3main])
    const totalcolection = async () => {

        if (acc && web3main) {
            setshow(true)

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.collectionform().call({ from: userwalletaddresss })
                .then((length) => {
                    setcolllist(length)
                    console.log('lklength', length)
                    

                })
                .catch()

        }
    }
    useEffect(() => {
        if(acc && web3main){
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
            setspin(i)
        }}


    }, [colllist,acc,web3main])
    const collectiondetails = async (id) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }

    const getalllist = (data) => {
        setalldata((old) => [
            ...old, data
        ])


    }


    return (

        <section className="popular-collections-area collec">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Collections</span>
                                <h3 className="mt-3 mb-0">Collections</h3>
                            </div>
                            <div className="intro-btn">
                                <a className="btn content-btn text-left" href="/allcol">More</a>
                            </div>
                        </div>
                    </div>
                </div>
            {
                accountid  && acc?
            
     
                <div className="row items">
                    {alldata?.map((val, idx) => {
                        return (
                            <>
                                {
                                    val[0] === "1" ? null :


                                        <div key={`cd_${idx}`} className="cscard col-12 col-sm-6 col-lg-3 item">
                                            <div className="card no-hover text-center">
                                                <div className="image-over maincolimg" >
                                                    <Link to={`/col-details/${val[0]}`} >
                                                        <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                    </Link>
                                                    {/* Seller */}
                                                    <Link className="seller" to={`/col-details/${val[0]}`} >
                                                        <div className="seller-thumb avatar-lg">
                                                            <img className="rounded-circle" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                        </div>
                                                    </Link>
                                                </div>
                                                {/* Card Caption */}
                                                <div className="card-caption col-12 p-0">
                                                    {/* Card Body */}
                                                    <div className="card-body mt-4">
                                                    <Link to={`/col-details/${val[0]}`} >
                                                            <h5 style={{ fontSize: '20px', textTransform: 'capitalize' }} className="mb-2">{val ? val[2] : null}</h5>
                                                        </Link>
                                                        <span>{val ? val[3] : null}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </>
                        );
                    })}
                </div>:
                           <div className="row items">
                           {dataa?.data?.map((val, idx) => {
                               return (
                                   <>
                                       {
                                           val?.attributes?.collectionId === "1" ? null :
       
       
                                               <div key={`cd_${idx}`} className="cscard col-12 col-sm-6 col-lg-3 item">
                                                   <div className="card no-hover text-center">
                                                       <div className="image-over maincolimg" >
                                                           <Link to={`/col-details/${val?.attributes?.collectionId}`} >
                                                               <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val?.attributes?.collectionImg}`} alt="" />
                                                           </Link>
                                                           {/* Seller */}
                                                           <Link className="seller" to={`/col-details/${val?.attributes?.collectionId}`}>
                                                               <div className="seller-thumb avatar-lg">
                                                                   <img className="rounded-circle" src={`https://ipfs.infura.io/ipfs/${val?.attributes?.collectionImg}`} alt="" />
                                                               </div>
                                                           </Link>
                                                       </div>
                                                       {/* Card Caption */}
                                                       <div className="card-caption col-12 p-0">
                                                           {/* Card Body */}
                                                           <div className="card-body mt-4">
                                                               <Link to={`/col-details/${val?.attributes?.collectionId}`} >
                                                                   <h5 style={{ fontSize: '20px', textTransform: 'capitalize' }} className="mb-2">{val?.attributes?.collectionName}</h5>
                                                               </Link>
                                                               <span>{val?.attributes?.displayName}</span>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                       }
                                   </>
                               );
                           })}
                       </div>
}
            </div>
        </section>
    );
}


export default Collections;