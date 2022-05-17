import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'

import { addrs } from '../../abi/address'
import { Link } from 'react-router-dom';
import { useMoralis, useMoralisQuery } from "react-moralis";
import { attribute } from 'dom-helpers';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/collections";

function Allasset({ allnft, acc, web3main }) {
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    const [show, setshow] = useState(false)
    const [spin, setspin] = useState()
    const { Moralis } = useMoralis();

    const [accountid, setaccountid] = useState()
    const dataa = useMoralisQuery('CREATECSDOGENFT')
    console.log('addfff', dataa?.data)
    const [chainid, setchainid] = useState()
    // useEffect(()=>{
    // const filter = dataa?.data?.filter((v)=>v?.attributes?.collectionId!=="0")
    // console.log('vbvbfil',filter)

    // const del = filter?.map((v)=>v.destroy().then((vi)=>console.log(vi)))

    // },[dataa])
    // const vb = dataa?.data?.map(v=>console.log("vbvbv",v?.attributes?.nftId))



    useEffect(async () => {
        if (acc, web3main) {
            // const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts1 = await web3main.eth.getAccounts();
            setaccountid(accounts1)
            // const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            // setchainid(chainId)
            totalnft()
        }
    }, [acc, web3main])

    const totalnft = async () => {

        if (acc && web3main) {
            setshow(true)

            //  console.log(accounts);
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((length) => {
                    console.log('length2', length)

                    setassetlist(Number(length))
                    for (let i = 1; i <= Number(length); i++) {
                        console.log('clk', i)
                        nftinfo(i);
                        // setspin(i)


                    }

                })
                .catch()

        }
    }
    // useEffect(() => {
    //     console.log('cl',assetist)
    //     if(acc & web3main){
    //     for (let i = 1; i <= Number(assetist); i++) {
    //         console.log('cl',i)
    //         nftinfo(i);
    //         setspin(i)


    //     }
    // }

    // }, [assetist,acc,web3main])

    const nftinfo = async (id) => {
        // console.log('four fun')
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            console.log('tok', id)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    getallasset(fees)
                    // const GameScore = Moralis.Object.extend("CREATECSDOGENFT");
                    // const gameScore = new GameScore();
                    // gameScore?.set("nftName", fees[1]);
                    // gameScore?.set("nftId", fees[0]);
                    // gameScore?.set("nftOwner", fees[3]);
                    // gameScore?.set("nftDes", fees[5]);
                    // gameScore?.set("nftImg", fees[6]);
                    // gameScore?.save()

                }).catch()

        }
    }
    const getallasset = (data) => {
        allsetcolllist(old => [
            ...old, data
        ])

    }
    // useEffect(()=>{
    //     dataa?.data?.map(async(v,i)=>{
    //         const findd= await allcolllist?.find(a=>a[0]===v?.attributes?.nftId)
    //         if(findd===undefined){
    //             console.log('bnor')

    //             findd?.set("nftName", findd[1]);
    //             findd?.set("nftId", findd[0]);
    //             findd?.set("nftOwner", findd[3]);
    //             findd?.set("nftDes", findd[5]);
    //             findd?.set("nftImg", findd[6]);
    //             findd?.save()
    //         }
    //         else{
    //             console.log("yes")
    //         }
    //     })

    // },[dataa?.data?.length])
    console.log('all', allcolllist)

    return (

        <section className="explore-area allasset">
            <div className="container-fuild">
                <div className="row px-3">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>ALL NFTs</span>
                                <h3 className="mt-3 mb-0">Sale</h3>
                            </div>
                            {
                                allnft === "allnft" ? null : <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/allnft">More</a>
                                </div>
                            }

                        </div>


                    </div>
                </div>
                {
                    accountid && allcolllist?.length > 0 && acc ?

                        <div className="row items px-3 ">
                            {allnft === "allnft" ?
                                allcolllist?.map((val, idx) => {
                                    return (
                                        <>
                                            {
                                                val ? val[7] === "1" ? null :

                                                    <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                                                        <div className="card no-hover text-center">
                                                            <div className="image-over mynft" >
                                                                <Link to={`/item-details/${val[0]}`} >
                                                                    <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                                </Link>

                                                            </div>
                                                            {/* Card Caption */}
                                                            <div className="card-caption col-12 p-0">

                                                                <div className="card-body px-2 mynftdes">
                                                                    <Link style={{ display: 'flex' }} to={`/item-details/${val[0]}`} >
                                                                        <h5 style={{ textTransform: 'capitalize' }} className="mb-0">{val ? val[1] : null}</h5>
                                                                    </Link>

                                                                    <div className="seller d-flex align-items-center my-3">
                                                                        <span>Owned By</span>
                                                                        <Link to={`/item-details/${val[0]}`}>
                                                                            <h6 style={{ textTransform: 'capitalize' }} className="ml-2 mb-0">{val ? val[3] : null}</h6>
                                                                        </Link>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> : null
                                            }
                                        </>
                                    );

                                }) : allcolllist?.slice(0, 8).map((val, idx) => {
                                    return (
                                        <>

                                            {
                                                
                                                val ? val[7] === "1" ? null :
                                                    <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                                                        <div className="card no-hover text-center">
                                                            <div className="image-over mynft" >
                                                                <Link to={`/item-details/${val[0]}`}>
                                                                    <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                                </Link>

                                                            </div>

                                                            <div className="card-caption col-12 p-0">

                                                                <div className="card-body px-2 mynftdes">
                                                                    <Link style={{ display: 'flex' }} to={`/item-details/${val[0]}`} >
                                                                        <h5 style={{ textTransform: 'capitalize' }} className="mb-0">{val ? val[1] : null}</h5>
                                                                    </Link>

                                                                    <div className="seller d-flex align-items-center my-3">
                                                                        <span>Owned By</span>
                                                                        <Link to={`/item-details/${val[0]}`} >
                                                                            <h6 style={{ textTransform: 'capitalize' }} className="ml-2 mb-0">{val ? val[3] : null}</h6>
                                                                        </Link>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> : null}

                                        </>
                                    );
                                })}
                        </div> :

                        <div className="row items px-3 ">
                            {allnft === "allnft" ?
                                dataa?.data?.map((val, idx) => {
                                    return (
                                        <>
                                            {
                                                val?.attributes?.collectionId === "1" ? null :

                                                    <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                                                        <div className="card no-hover text-center">
                                                            <div className="image-over mynft" >
                                                                <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                                    <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val?.attributes?.nftImg}`} alt="" />
                                                                </Link>

                                                            </div>
                                                            {/* Card Caption */}
                                                            <div className="card-caption col-12 p-0">

                                                                <div className="card-body px-2 mynftdes">
                                                                    <Link style={{ display: 'flex' }} to={`/item-details/${val?.attributes?.nftId}`} >
                                                                        <h5 style={{ textTransform: 'capitalize' }} className="mb-0">{val?.attributes?.nftName}</h5>
                                                                    </Link>

                                                                    <div className="seller d-flex align-items-center my-3">
                                                                        <span>Owned By</span>
                                                                        <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                                            <h6 style={{ textTransform: 'capitalize' }} className="ml-2 mb-0">{val?.attributes?.nftOwner}</h6>
                                                                        </Link>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                    );
                                }) : dataa?.data?.slice(3, 11).map((val, idx) => {
                                    return (
                                        <>
                                        {
                                            val?.attributes?.collectionId === "1" ? null :

                                                <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                                                    <div className="card no-hover text-center">
                                                        <div className="image-over mynft" >
                                                            <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                                <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val?.attributes?.nftImg}`} alt="" />
                                                            </Link>

                                                        </div>
                                                        {/* Card Caption */}
                                                        <div className="card-caption col-12 p-0">

                                                            <div className="card-body px-2 mynftdes">
                                                                <Link style={{ display: 'flex' }} to={`/item-details/${val?.attributes?.nftId}`} >
                                                                    <h5 style={{ textTransform: 'capitalize' }} className="mb-0">{val?.attributes?.nftName}</h5>
                                                                </Link>

                                                                <div className="seller d-flex align-items-center my-3">
                                                                    <span>Owned By</span>
                                                                    <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                                                        <h6 style={{ textTransform: 'capitalize' }} className="ml-2 mb-0">{val?.attributes?.nftOwner}</h6>
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
                }

            </div>
        </section>
    );
}


export default Allasset;