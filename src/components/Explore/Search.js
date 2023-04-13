import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link,useParams } from 'react-router-dom';

import { addrs } from '../../abi/address'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { attribute } from 'dom-helpers';

function ExploreTwo({ colid ,acc,web3main}) {
    // console.log('cca',acc)
    const [colllist, setcolllist] = useState()
    const [alldata, setalldata] = useState([])
    const [show, setshow] = useState(false)
    const [result, setresult] = useState([])
    const [dataresult, datasetresult] = useState([])
    const [resulta, setresulta] = useState([])
    const [ddresulta, setddresulta] = useState([])
    const { word } = useParams()
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    const [accountid,setaccountid] = useState()
    useEffect(async() => {
        if(acc && web3main){
        totalcolection()
        totalnft()
        const accounts1 = await web3main.eth.getAccounts();
        setaccountid(accounts1[0])
        }

    }, [acc,web3main])
    const dataa = useMoralisQuery('CREATECSDOGENFT')
    console.log('addfff', dataa?.data)
    const dataa1 = useMoralisQuery('CREATECSDOGECOL')
    console.log('addfff1', dataa?.data)
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
                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
        }


    }, [colllist])
    const collectiondetails = async (id) => {
        if (acc && web3main) {
           const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log("fff", fees);
                    // setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }

    const getalllist = (data) => {
        setalldata((old) => [
            ...old, data
        ])


    }
   
     
     const totalnft = async () => {
         if (acc && web3main) {
             setshow(true)
             const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
 
             swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                 .then((length) => {
 
                    //  setassetlist(length)
                    console.log('pop',length)
                     for (let i = 1; i <= Number(length); i++) {
                        nftinfo(i);
                        
                        
                    }
                 })
                 .catch()
 
         }
     }

 
     const nftinfo = async (id) => {
         console.log('four fun',id)
         if (acc && web3main) {
             const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
 
             swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                 .then((fees) => {
                     
                     getallasset(fees)
                     console.log('ccc',fees)
 
                 }).catch()
 
         }
     }
     const getallasset = (data)=>{
         allsetcolllist(old=>[
             ...old,data
         ])
 
     }
     
    
    console.log("cm",allcolllist)

    // console.log('alladata', aldatafil)
    useEffect(() => {

        if (word !== "") {
            // console.log('aaa', word)
            const newlist = alldata.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            setresult(newlist)
        }

    }, [word,alldata])
    useEffect(() => {

        if (word !== "") {
            // console.log('aaa', word)
            const newlist = dataa?.data?.filter((con) => {
                return Object.values(con?.attributes).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            
            datasetresult(newlist)
        }

    }, [word,dataa?.data])
    useEffect(() => {

        if (word !== "") {
            // console.log('aaa', word)
            const newlist = dataa1?.data?.filter((con) => {
                return Object.values(con?.attributes).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            
            setddresulta(newlist)
        }

    }, [word,dataa1?.data])

    useEffect(() => {

        if (word !== "") {
            // console.log('aaa', word)
            const newlist = allcolllist.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            
            setresulta(newlist)
        }

    }, [word,allcolllist])
    

   
    return (
     
        <section className="popular-collections-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Search {word}</span>
                                <h3 className="mt-3 mb-0">Assets</h3>
                            </div>
                          
                        </div>
                    </div>
                </div>
                {
                    acc?
                
                <div className="row items">
                    {result?.map((val, idx) => {
                        return (
                            <>
                            {
                                val[0]==="1"?null:
                            
                            <div key={`cd_${idx}`} className="col-12 cscard col-sm-6 alist col-lg-3 item">
                                    <div className="card no-hover text-center">
                                        <div className="image-over maincolimg">
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
                                            <Link to={`/col-details/${val[0]}`}  >
                                                    <h5 style={{textTransform:'capitalize'}} className="mb-2">{val? val[2]:null}</h5>
                                                </Link>
                                                <span style={{textTransform:'capitalize'}}>{val? val[3]:null}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                </>
                        );
                      
                    })}
                     {resulta?.map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over mynft">
                                        <Link to={`/item-details/${val[0]}`}  >
                                            <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                        </Link>
                                      
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                      
                                        <div className="card-body">
                                            <Link to={`/item-details/${val[0]}`} >
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
                        );
                    })}
                </div>:
                 <div className="row items">
                 {ddresulta?.map((val, idx) => {
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
                  {dataresult?.map((val, idx) => {
                          return (
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
                          );
                      }) }
             </div>
}
            </div>
        </section>
    );
}


export default ExploreTwo;