import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import Popup from 'reactjs-popup'

import { addrs, userid,token } from '../../abi/address'
import { Link, NavLink } from 'react-router-dom';
import ERC20 from '../../abi/ERC20.json'
import { Modal, Spinner, ProgressBar } from 'react-bootstrap'
import { IoIosAddCircle } from "react-icons/io";
import fromExponential from 'from-exponential'
import { useMoralis, useMoralisQuery } from "react-moralis";
import 'reactjs-popup/dist/index.css';



// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/collections";

function Csdoge({ acc, web3main }) {
    console.log('csdogeass', acc)
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    // const [active, setactive] = useState('sales')
    // const [list, setlist] = useState([])
    // const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [chainid, setchainid] = useState()
    const [open, setopen] = useState()
    const [add, setadd] = useState()
    const [gift, setgift] = useState(false)
    const [mainlistauc, setmainlistauc] = useState([])
    const [pricelast, setpricelast] = useState([])

    const [tokenid, settokenid] = useState()
    // const [allprice, setallprice] = useState()
    const [cklist, setcklist] = useState([])
    const [accountid, setaccountid] = useState()
    const [burnc, setburnc] = useState()
    const [bar, setbar] = useState()
    console.log('barr', bar)
    const adminid = "0x6a17a6be25b2bbbd3f6dce4444ffc016aec77fc3"
    useEffect(async () => {
        if (acc && web3main) {
            nftidnew()
            const accounts1 = await web3main.eth.getAccounts();
            setaccountid(accounts1[0])
            // const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            // setchainid(chainId)
        }



    }, [acc, web3main])
    // 0x1fee4FB5Afb9e893BE644e3CB89D71bb9f8bEe3D

    const nftidnew = async () => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.csdogenft().call({ from: userwalletaddresss })
                .then((id) => {
                    console.log("id", id);
                    var listlen = id?.length
                    // console.log('bn',length[0])
                    for (let i = 0; i < listlen; i++) {
                        // console.log(`akk${i}`,length[0][i])
                        console.log(id[i])
                        nftinfo(id[i])
                        salenftprie(id[i])
                        tokeninfo(id[i])


                    }
                })
                .catch()
        }
    }
    const nftinfo = async (id) => {
        // console.log('4')
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log(`detail${id}`,fees);
                    // setspin(fees)

                    // localStorage.setItem(`buylist${id}`, JSON.stringify(fees))
                    // setArr(id)
                    // salenftprie(fees[0])
                    console.log(fees)
                    swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                        .then((length) => {

                            
                            swaping.methods.csdogeinfo(id).call({ from: userwalletaddresss })
                                .then((feesone) => {
                                  
                                    // checklist(val);
                                    savelist({ ...fees, 10: feesone[0]?Number(length[3]) / 1000000000: Number(length[3]) / 1000000000000000000,11:feesone[0],12:Number(feesone[1]),13:Number(feesone[2]) })


                                })
                                .catch()

                        })
                        .catch()


                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }
    const dataa = useMoralisQuery('CREATECSDOGENFT')
    // console.log('dataaaaa', dataa?.data)
    const fildata = dataa?.data?.filter((v) => Number(v?.attributes?.csprice) > 0)
    console.log('fildata', fildata)

    const salenftprie = async (id) => {
        // console.log('riht',id)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    const val = {
                        id: id, value: Number(length[3]) / 1000000000000000000
                    }
                    console.log('aaaprice', length);
                    // setlist(length[1])
                    // setlist2(length[1])
                    // localStorage.setItem(`normasale${id}`, (length[3]))
                    // setpricearr(id)
                    getallprice(val)
                })
                .catch()

        }
    }
    const getallprice = (data) => {
        if (data.id === "0") {
            // console.log('notallowed',data)
        } else {
            // console.log('dataaallower',data)
            setallp((old) => [
                ...old, data
            ])

        }

    }
    const buyfixednft = async (collectionid, tokenid,ckamout ) => {
        console.log('buy nft fix')
        // let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        // let ckamout = amount
        // console.log('ckk', ckamout)


        if (web3main && ckamout) {
            // alert('hello')
            const accounts = await web3main.eth.getAccounts();
            console.log("ckamout", ckamout);
            settokenid(accounts)
            setShow(true)

            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((ckamout) * Math.pow(10, 18)));
            console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid, address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    localStorage.removeItem(`buylist${tokenid}`)
                    window.location.reload(true)
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })

        }
    }
    console.log('price', allfixed)
    const tokeninfo = async (tokenid) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.csdogeinfo(tokenid).call({ from: userwalletaddresss })
                .then((fees) => {
                    const val = {
                        id: tokenid,
                        ck: fees[0],
                        copy: Number(fees[1]),
                        total: Number(fees[2])
                    }
                    checklist(val)


                })
                .catch()

        }
    }
    const checklist = (data) => {
        setcklist((old) => [
            ...old, data
        ])

    }
    console.log("listt", cklist)

    console.log(cklist)
    const buycsdoge = async (collectionid, tokenid,ckamout) => {
        console.log('buy csdoe')

        // let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        // let ckamout = amount
        // console.log("amt", amount)
        setShow(true)
        if (acc && web3main && ckamout) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            // let swaping = new web3main.eth.Contract(nft, addrs)
            let tokenaddress = token;
            const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
            let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(ckamout)) * Math.pow(10, 9))));
            ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                .then((res) => {
                    console.log(res);
                    let swaping = new web3main.eth.Contract(nft, addrs)
                    swaping.methods.buynft(collectionid, tokenid, tokenaddress).send({ from: userwalletaddresss })
                        .then((fees) => {
                            console.log(fees);
                            window.location.reload()
                            setShow(false)
                        }).catch()
                })
                .catch(() => {
                    setShow(false)

                })
        }
    }
    const buycopiesnft = async (tokenid, boolvalue, amount) => {
        console.log('buy copy')
        // let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        // // let ckamout =  amount / 1000000000000000000
        setShow(true)
        console.log('ckamout', amount)

        if (acc && web3main && amount) {

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            const gout = gift ? add : accountid
            if (boolvalue) {
                let tokenaddress = token;
                const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 9))));
                ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                    .then((res) => {
                        console.log("gou", gout);
                        let swaping = new web3main.eth.Contract(nft, addrs)
                        swaping.methods.buycopies(tokenaddress, tokenid, gout).send({ from: userwalletaddresss })
                            .then((fees) => {
                                console.log(fees);
                                window.location.reload()
                            }).catch(() => {
                                setShow(false)
                            })
                    })
                    .catch(() => {
                        setShow(false)

                    })
            }
            else {
                let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
                console.log('amout', amountIn)
                let tokenaddress = '0x0000000000000000000000000000000000000000'
                swaping.methods.buycopies(tokenaddress, tokenid, gout).send({ from: userwalletaddresss, value: amountIn })
                    .then((recipt) => {
                        // console.log(recipt);
                        setShow(false)
                        localStorage.removeItem(`buylist${tokenid}`)
                        window.location.reload(true)
                    })
                    .catch((err) => {
                        setShow(false)
                        settokenid('')
                    })

            }
        }
    }
    const burncopiesnft = async (tokenid, copiesnumber) => {
        console.log("id", tokenid)
        console.log("cop", copiesnumber)
        setShow(true)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.burncopies(copiesnumber, tokenid).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    setShow(false)
                    window.location.reload()
                })
                .catch(() => {
                    setShow(false)
                })

        }
    }
    // const dataa = useMoralisQuery('CREATECSDOGENFT')
    // const ffind = dataa?.data?.find((v) => v?.attributes?.nftId === csid)
    const burnmain = async (tokenid) => {

        setShow(true)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.burnorinalnft("1", tokenid).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    setShow(false)
                    const ffind = dataa?.data?.find((v) => v?.attributes?.nftId === tokenid)
                    console.log('burn',ffind)
                    ffind?.destroy()
                    
                    window.location.reload()
                })
                .catch(() => {
                    setShow(false)
                })

        }
    }

    return (


        <section className="popular-collections-area csdogemain">
            <div className="container-fuild px-3">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        {/* {
                            accountid === userid ? <NavLink to="/createcsdoge">
                                <button className="d-block btn btn-bordered-white mt-4 w-100">Create CSdoge</button>
                            </NavLink> : null
                        } */}

                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>CSDOGE</span>
                                <h3 className="mt-3 mb-0">CSDOGE</h3>
                            </div>
                            {/* <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/explore-2">{this.state.data.btnText}</a>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {
                        accountid?.toLowerCase() === userid?.toLowerCase() ?
                            <div className="col-12 csmain col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center" style={{ height: '470px' }}>

                                    {/* Card Caption */}




                                    <div className="card-body">
                                        <NavLink to="/createcsdoge">
                                            <IoIosAddCircle className="csdogeadd" style={{ fontSize: '250px', color: '#99B7FF' }} />
                                        </NavLink>



                                        <div className="card-bottom mt-3 text-center">
                                            <h3 style={{ fontSize: '28px' }} className="m-0">CREATE</h3>
                                            <h3 style={{ fontSize: '28px' }}>CSDOGE</h3>

                                        </div>
                                        <div >

                                        </div>

                                    </div>

                                </div>
                            </div> : null
                    }
                    {
                        accountid && acc ?


                            <>
                                {allfixed?.map((val, id) => {
                                    return (
                                        <div key={`cd_${id}`} className="col-12 csmain col-sm-6 col-lg-3 item">
                                            <div className="card no-hover text-center">
                                                <div className="image-over csimg">
                                                    <Link to={`/cs-details/${val[0]}`} >
                                                        <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                    </Link>
                                                    {/* Seller */}
                                                    {/* <Link className="seller" to={{
                                                pathname:"/col-details",
                                                state:val
                                            }}>
                                                <div className="seller-thumb avatar-lg">
                                                    <img className="rounded-circle" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                </div>
                                            </Link> */}
                                                </div>
                                                {/* Card Caption */}
                                                <div className="card-caption col-12 p-0 csdetail">
                                                    {/* Card Body */}
                                                    {/* <div className="card-body mt-4">
                                            <Link to={{
                                                pathname:"/col-details",
                                                state:val
                                            }} >
                                                    <h5 className="mb-2">{val? val[2]:null}</h5>
                                                </Link>
                                                <span>{val? val[3]:null}</span>
                                            </div> */}
                                                    <Link to={`/cs-details/${val[0]}`}>

                                                        <h5 style={{ textTransform: 'capitalize' }} className="mb-0">{val ? val[1] : null}</h5>

                                                    </Link>

                                                    <div className="card-body">

                                                        <form onSubmit={(e) => {
                                                            e.preventDefault()
                                                            burncopiesnft(val[0], burnc)
                                                        }}>
                                                            {
                                                                accountid === userid ? <span style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <input type="number" min="0" style={{ border: 'none', outline: 'none' }} placeholder="Burn Copies Number" onChange={(e) => setburnc(e.target.value)} required />
                                                                    <button type="submit" className="btn btn-bordered-white btn-smaller mt-3">Burn</button>
                                                                </span> : null
                                                            }

                                                        </form>
                                                        <div className="seller d-flex align-items-center">
                                                            <span >Owned By</span>
                                                            <Link to={`/cs-details/${val[0]}`}>
                                                                <h6 style={{ textTransform: 'capitalize' }} className="ml-2 mb-0">{val ? val[3] : null}</h6>
                                                            </Link>

                                                        </div>
                                                        <div className="card-bottom d-flex justify-content-between">
                                                            {/* {allp.map((vala) => {

                                                                if (vala.id === val[0]) {
                                                                    return <span>{allp[id]?.value} {cklist.map((vala) => {
                                                                        if (vala.id === val[0]) {
                                                                            return <>
                                                                                {
                                                                                    vala.ck ? "CSDOGE" : "BNB"
                                                                                }
                                                                            </>
                                                                        }
                                                                    })} </span>

                                                                }


                                                            })} */}
                                                            <span>{val? val[10]:null} {val?val[11]?"CSDOGE" : "BNB":null}</span>
                                                            {/* {
                                                                cklist?.map((ck, i) => {
                                                                    if (ck.id === val[0]) {
                                                                        return <span >{ck.copy} of {ck.total} </span>

                                                                    }

                                                                })
                                                            } */}
                                                            {
                                                                <span >{val?val[12]:null} of {val? val[13]:null} </span>
                                                            }


                                                        </div>
                                                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            {
                                                                cklist?.map((ck, i) => {
                                                                    if (ck.id === val[0]) {
                                                                        return <ProgressBar className="mx-3" now={100 - (ck.copy / ck.total) * 100} />

                                                                    }

                                                                })
                                                            }
                                                        </div> */}
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <ProgressBar className="mx-3" now={100 - (val?val[12]:null / val? val[13]:null) * 100} />
                                                            
                                                        </div>
                                                        


                                                        {/* {cklist.map((vala) => {
                                                            if (vala.id === val[0]) {
                                                                return <>
                                                                    {
                                                                        vala.copy === 0 ? vala.ck ? <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buycsdoge(val[7], val[0])}>Buy</button> : <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buyfixednft(val[7], val[0])}>Buy</button> : vala.ck ? <Popup style={{ padding: '10px', backgroundColor: '#141324' }} trigger={<button className="btn btn-bordered-white btn-smaller mt-3">Buy CSDOGE</button>} position="top left">
                                                                            {close => (
                                                                                <div>
                                                                                    <div style={{ padding: '10px', backgroundColor: '#141324' }}>
                                                                                       
                                                                                        <div className="form-group row">
                                                                                            <div className="col-12 md-6 ">
                                                                                                <label for="Gift">Gift</label>
                                                                                                <input type="radio" id="Gift" name="fav_language" checked={gift === true} onClick={() => setgift(true)} />
                                                                                            </div>
                                                                                            <div className="col-12 md-6">
                                                                                                <label for="Own" >Own</label>
                                                                                                <input type="radio" id="Own" name="fav_language" checked={gift === false} onClick={() => setgift(false)} />
                                                                                            </div>


                                                                                        </div>
                                                                                        {
                                                                                            gift ? <div > <input type="text" className="mt-1" placeholder="Address" onChange={(e) => setadd(e.target.value)} /></div> : null
                                                                                        }
                                                                                        <div style={{ borderTop: '2px solid white' }}>
                                                                                            <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => {
                                                                                                buycopiesnft(val[0], true)
                                                                                            }}>Buy</button>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            )}
                                                                        </Popup> :
                                                                            <Popup style={{ padding: '15px', backgroundColor: '#141324' }} trigger={<button className="btn btn-bordered-white btn-smaller mt-3">Buy CSDOGE</button>} position="top left">
                                                                                {close => (
                                                                                    <div>
                                                                                        <div style={{ padding: '10px', backgroundColor: '#141324' }}>
                                                                                           
                                                                                            <div className="form-group row">
                                                                                                <div className="col-12 md-6 ">
                                                                                                    <label for="Gift">Gift</label>
                                                                                                    <input type="radio" id="Gift" name="fav_language" checked={gift === true} onClick={() => setgift(true)} />
                                                                                                </div>
                                                                                                <div className="col-12 md-6">
                                                                                                    <label for="Own" >Own</label>
                                                                                                    <input type="radio" id="Own" name="fav_language" checked={gift === false} onClick={() => setgift(false)} />
                                                                                                </div>


                                                                                            </div>
                                                                                            {
                                                                                                gift ? <div > <input type="text" className="mt-1" placeholder="Address" onChange={(e) => setadd(e.target.value)} /> </div> : null
                                                                                            }
                                                                                            <div style={{ borderTop: '2px solid white' }}>
                                                                                                <button className="btn btn-bordered-white btn-smaller ml-2 mt-3" onClick={() => {

                                                                                                    buycopiesnft(val[0], false)
                                                                                                }}>{gift ? "BUY(Gift)" : "Buy(Own)"}</button>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                )}
                                                                            </Popup>

                                                                    }
                                                                   
                                                                </>
                                                            }
                                                        })} */}



                                                         {
                                                                        val[12] === 0 ? val[11] ? <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buycsdoge(val[7], val[0],val[10])}>Buy</button> : <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buyfixednft(val[7], val[0],val[10])}>Buy</button> : val[11] ? <Popup style={{ padding: '10px', backgroundColor: '#141324' }} trigger={<button className="btn btn-bordered-white btn-smaller mt-3">Buy CSDOGE</button>} position="top left">
                                                                            {close => (
                                                                                <div>
                                                                                    <div style={{ padding: '10px', backgroundColor: '#141324' }}>
                                                                                        {/* <button className="btn btn-bordered-white btn-smaller my-3" onClick={() => setgift(true)}>Gift</button>
                                                                                        <button className="btn btn-bordered-white btn-smaller my-3" onClick={() =>
                                                                                            setgift(false)}>Own</button> */}
                                                                                        <div className="form-group row">
                                                                                            <div className="col-12 md-6 ">
                                                                                                <label for="Gift">Gift</label>
                                                                                                <input type="radio" id="Gift" name="fav_language" checked={gift === true} onClick={() => setgift(true)} />
                                                                                            </div>
                                                                                            <div className="col-12 md-6">
                                                                                                <label for="Own" >Own</label>
                                                                                                <input type="radio" id="Own" name="fav_language" checked={gift === false} onClick={() => setgift(false)} />
                                                                                            </div>


                                                                                        </div>
                                                                                        {
                                                                                            gift ? <div > <input type="text" className="mt-1" placeholder="Address" onChange={(e) => setadd(e.target.value)} /></div> : null
                                                                                        }
                                                                                        <div style={{ borderTop: '2px solid white' }}>
                                                                                            <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => {
                                                                                                buycopiesnft(val[0], true,val[10])
                                                                                            }}>Buy</button>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            )}
                                                                        </Popup> :
                                                                            <Popup style={{ padding: '15px', backgroundColor: '#141324' }} trigger={<button className="btn btn-bordered-white btn-smaller mt-3">Buy CSDOGE</button>} position="top left">
                                                                                {close => (
                                                                                    <div>
                                                                                        <div style={{ padding: '10px', backgroundColor: '#141324' }}>
                                                                                            {/* <button className="btn btn-bordered-white btn-smaller my-3" onClick={() => setgift(true)}>Gift</button>
                                                                                            <button className="btn btn-bordered-white btn-smaller my-3" onClick={() =>
                                                                                                setgift(false)}>Own</button> */}
                                                                                            <div className="form-group row">
                                                                                                <div className="col-12 md-6 ">
                                                                                                    <label for="Gift">Gift</label>
                                                                                                    <input type="radio" id="Gift" name="fav_language" checked={gift === true} onClick={() => setgift(true)} />
                                                                                                </div>
                                                                                                <div className="col-12 md-6">
                                                                                                    <label for="Own" >Own</label>
                                                                                                    <input type="radio" id="Own" name="fav_language" checked={gift === false} onClick={() => setgift(false)} />
                                                                                                </div>


                                                                                            </div>
                                                                                            {
                                                                                                gift ? <div > <input type="text" className="mt-1" placeholder="Address" onChange={(e) => setadd(e.target.value)} /> </div> : null
                                                                                            }
                                                                                            <div style={{ borderTop: '2px solid white' }}>
                                                                                                <button className="btn btn-bordered-white btn-smaller ml-2 mt-3" onClick={() => {

                                                                                                    buycopiesnft(val[0], false,val[10])
                                                                                                }}>{gift ? "BUY(Gift)" : "Buy(Own)"}</button>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                )}
                                                                            </Popup>

                                                                    }
                                                        {
                                                            accountid === userid ?
                                                                <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => burnmain(val[0])} >Burn CSDOGE</button> : null}
                                                        {/* <button onClick={()=>setbar(cklist?.map((ck,i)=>{
                                                if(ck.id === val[0]){
                                                    return (ck.copy/ck.total )*100

                                                }
                                                
                                            })
                                            )}>ck</button> */}
                                                        {

                                                        }

                                                        {/* <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buyfixednft(val[7], val[0])}><i className="icon-handbag mr-2" />Buy sale</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </> :
                            <>

                                {fildata?.map((val, id) => {
                                    return (
                                        <div key={`cd_${id}`} className="col-12 csmain col-sm-6 col-lg-3 item">
                                            <div className="card no-hover text-center">
                                                <div className="image-over csimg">
                                                    <Link to={`/cs-details/${val?.attributes?.nftId}`} >
                                                        <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val?.attributes?.nftImg}`} alt="" />
                                                    </Link>
                                                </div>
                                                <div className="card-caption col-12 p-0 csdetail">
                                                    <Link to={`/cs-details/${val?.attributes?.nftId}`}>

                                                        <h5 style={{ textTransform: 'capitalize' }} className="mb-0">{val?.attributes?.nftName}</h5>

                                                    </Link>

                                                    <div className="card-body">
                                                        <div className="seller d-flex align-items-center">
                                                            <span >Owned By</span>
                                                            <Link to={`/cs-details/${val?.attributes?.nftId}`}>
                                                                <h6 style={{ textTransform: 'capitalize' }} className="ml-2 mb-0">{val?.attributes?.nftOwner}</h6>
                                                            </Link>

                                                        </div>
                                                        <div className="card-bottom d-flex justify-content-between">
                                                            <span >{val?.attributes?.csprice} {val?.attributes?.csbool === "true" ? "CSDOGE" : "BNB"}</span>
                                                            <span >{val?.attributes?.copy} of {val?.attributes?.totalcopy} </span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                                                            <ProgressBar className="mx-3" now={100 - (val?.attributes?.copy / val?.attributes?.totalcopy) * 100} />


                                                        </div>


                                                        <button className="btn btn-bordered-white btn-smaller mt-3" >Buy CSDOGE</button>



                                                        {/* <button onClick={()=>setbar(cklist?.map((ck,i)=>{
                                                 if(ck.id === val[0]){
                                                     return (ck.copy/ck.total )*100
 
                                                 }
                                                 
                                             })
                                             )}>ck</button> */}
                                                        {

                                                        }
                                                        {/* <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buyfixednft(val[7], val[0])}><i className="icon-handbag mr-2" />Buy sale</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>}
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >

                    <Modal.Body>


                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}><Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                        </div>






                    </Modal.Body>
                </Modal>
            </div>
        </section>
    );
}


export default Csdoge;