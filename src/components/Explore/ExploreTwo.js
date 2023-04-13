import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link } from 'react-router-dom';

import { addrs } from '../../abi/address'

function ExploreTwo({ colid ,ckkid,web3main}) {
    console.log("colid", colid)
    const [allasset, setallasset] = useState([])

    console.log('aasssalldata', allasset)
    useEffect(() => {
        if(web3main){
        nftarray(colid)
        }

    }, [web3main])
    const nftarray = async (collectionid) => {
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.collectionnft(collectionid).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("fees", fees);
                    for (let i = 0; i < fees?.length; i++) {
                        nftinfo(fees[i])

                    }
                }).catch()

        }
    }

    const nftinfo = async (id) => {
        // alert('hello3')
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    callasset(fees)


                }).catch()

        }
    }
    const callasset = (data) => {
        setallasset((old) => [
            ...old, data
        ])
    }

    return (
        <section className="popular-collections-area mxpo">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Assets</span>
                                <h3 className="mt-3 mb-0">Assets</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {allasset?.map((val, idx) => {
                        return (
                            <> 
                            {
                                ckkid===val[0]?null:
                            
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over mynft" > 
                                        <Link to={`/item-details/${val[0]}`} >
                                            <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                        </Link>
                                        {/* Seller */}
                                      
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        
                                        <div className="card-body px-2 mynftdes">
                                            <Link style={{display:'flex'}} to={`/item-details/${val[0]}`} >
                                                <h5 style={{textTransform:'capitalize'}} className="mb-0">{val ? val[1] : null}</h5>
                                            </Link>

                                            <div className="seller d-flex align-items-center my-3">
                                                <span>Owned By</span>
                                                <Link to={`/item-details/${val[0]}`} >
                                                    <h6 style={{textTransform:'capitalize'}} className="ml-2 mb-0">{val ? val[3] : null}</h6>
                                                </Link>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                            </>
                        );
                      
                    })}
                </div>
            </div>
        </section>
    );
}


export default ExploreTwo;