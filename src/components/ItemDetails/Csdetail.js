import React, {  useEffect, useState } from 'react';
import {useLocation, useHistory,useParams } from 'react-router-dom';

import Web3 from 'web3'
import nft from '../../abi/nft.json'
// import { Link } from 'react-router-dom';

import { addrs,token } from '../../abi/address'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Modal, Spinner } from 'react-bootstrap'
import fromExponential from 'from-exponential';
import ERC20 from '../../abi/ERC20.json'

function Csdetail({acc,web3main}) {
    const location = useLocation()
    // const fdata = location.state
    const { csid } = useParams()

    const [buyprice, setbuyprice] = useState()
    const [buyaucprice, setaucbuyprice] = useState()
    // const [openbid, setopenbid] = useState()
    const [auch, setauch] = useState()
    // const [auctionprice, setauctionprice] = useState()
    const [time, settime] = useState()
    const [accountid, setaccountid] = useState()
    // const [hour, sethour] = useState()
    // const [days, setdays] = useState()
    // const [saleval, setsaleval] = useState()
    // const [auctionval, setauctionvalue] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // console.log('ssa', buyprice)
    // console.log('€auc ssa', auctionprice)
    const history = useHistory()
    const [cklist, setcklist] = useState()
    const [cspric, setcsprice] = useState()
    const [fdata, setfdata] = useState()
    const dataa = useMoralisQuery('CREATECSDOGENFT')
    const ffind = dataa?.data?.find((v) => v?.attributes?.nftId === csid)
   
    useEffect(async () => {
        if(acc && web3main){

        salenft(csid)
        auctiondetail(csid)
        timer(csid)
        const accounts1 = await web3main.eth.getAccounts();
        setaccountid(accounts1[0])
        tokeninfo(csid)
        salenftprie(csid)
        nftinfo(csid)
        }
    }, [csid,acc,dataa?.data?.length,web3main,ffind])
    console.log('accoutid', accountid)
    // const dataa = useMoralisQuery('CREATECSDOGENFT')
    // console.log('addfff', dataa?.data)
   
    console.log('accoutid', ffind)
    const salenft = async (id) => {
        // console.log('2')
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    console.log('aaa', length[2]);
                    // setlist(length[0])
                    // setlist2(length[1])
                    // console.log('listone',length[0])
                    setbuyprice((Number(length[3])).length > 21 ? (Number(length[3])) / 1000000000000000000000000000000000000 : (Number(length[3])) / 1000000000000000000)
                    setaucbuyprice((Number(length[2])).length > 21 ? (Number(length[2])) / 1000000000000000000000000000000000000 : (Number(length[2])) / 1000000000000000000)
                    // setcheckm(length[0])
                    // var listlen = length[0]?.length
                    // // console.log('bn',length)
                    // setaucprice(Number(length[2]))


                })
                .catch()

        }
    }
    useEffect(() => {
        if (ffind && csid && acc && web3main ) {
            tokeninfo(csid)
            salenftprie(csid)

        }

    }, [dataa?.data,csid,acc,web3main])
    const buyfixednft = async (collectionid, tokenid, amount) => {
        console.log(`${collectionid}, ${tokenid}, ${amount}`)
        let ckamout = cspric?.value



        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            setShow(true)

            
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((ckamout) * Math.pow(10, 9)));
            console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid, address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    ffind?.set('csprice',"0")
                    ffind?.save()

                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)

                })

        }
    }
    const auctiondetail = async (id) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.auctiondetail(id).call({ from: userwalletaddresss })
                .then((value) => {
                    // console.log('assasacvbv',value);     
                    // localStorage.setItem(`highauc${id}`, value[0])
                    // localStorage.setItem(`highaucid${id}`, value[1])
                    var aucde = {
                        id: value[1],
                        val: (Number(value[0])),
                        userid: id
                    }
                    setauch(aucde)
                    console.log('auction high bid', aucde)
                }).catch()

        }
    }
    const buyauctionnft = async (tokenid, amount) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            // settokenid(accounts)
            setShow(true)

            
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 9)));
            swaping.methods.buyauction(tokenid).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    history.push('/')
                })
                .catch((err) => {
                    setShow(false)
                    // settokenid('')
                })
        }
    }
    const timer = async (id) => {
        // console.log('saa',id)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)


            swaping.methods.timing(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    var day = Math.floor(fees / 86400)
                    var hr = Math.floor((fees - day * 86400) / 3600)
                    var minutesout = Math.floor((fees - day * 86400 - hr * 3600) / 60);
                    // console.log("hr",hr)
                    // console.log("day",day)
                    // console.log("min",minutesout)
                    settime({ id: id, d: day, h: hr, m: minutesout })


                }).catch()

        }
    }
    const claimauctionnft = async (collectionid, tokenid) => {
        if (acc && web3main) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);

            // settokenid(accounts)
            setShow(true)
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(window.ethereum);
            let swaping = new web3main.eth.Contract(nft, addrs)
            // let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10,18)));
            swaping.methods.claim(collectionid, tokenid).send({ from: userwalletaddresss })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    history.push('/')
                })
                .catch((err) => {
                    setShow(false)
                    // settokenid('')
                })
        }
    }
    console.log('time', time)
    console.log('fdata', fdata)

    // console.log("mmm", fdata)
    const fixedsale = async (tokenid, price) => {
        console.log('akhj', price)
        console.log('tokenakhj', tokenid)
        setShow(true)
        if (acc && web3main) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(window.ethereum);
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amount = web3main.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));
            console.log('mainamout', amount)

            swaping.methods.fixedsales(tokenid, amount, false).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    if (length.status === true) {
                        setShow(false)
                        history.push('/')

                    } else {
                        alert('failed')
                    }
                })
                .catch((err) => {
                    setShow(false)

                })

        }
    }

    const auction = async (tokenid, price, endday, endhours) =>
    // console.log('aa',price)
    {
        console.log('aaaa,', price)
        if (acc && web3main) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);

            setShow(true)

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(window.ethereum);
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((price) * Math.pow(10, 18)));

            swaping.methods.startauction(tokenid, amountIn, endday, endhours).send({ from: userwalletaddresss })
                .then((recipt) => {
                    console.log(recipt);
                    if (recipt.status === true) {

                        setShow(false)
                        history.push('/')

                    } else {
                        alert('failed')
                    }

                })
                .catch(err => {

                    setShow(false)


                })

        }
    }




    const nftidnew = async () => {
        if (acc && web3main) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(window.ethereum);
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.csdogenft().call({ from: userwalletaddresss })
                .then((id) => {
                    console.log("id", id);
                    var listlen = id?.length
                    // console.log('bn',length[0])
                    for (let i = 0; i < listlen; i++) {
                        // console.log(`akk${i}`,length[0][i])
                        console.log(id[i])
                        // nftinfo(id[i])
                        // salenftprie(id[i])
                        // tokeninfo(id[i])


                    }
                })
                .catch()
        }
    }
    const nftinfo = async (id) => {
        // console.log('4')
        if ( acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log(`detail${id}`,fees);
                    // setspin(fees)
                    // savelist(fees)
                    // localStorage.setItem(`buylist${id}`, JSON.stringify(fees))
                    // setArr(id)
                    // salenftprie(fees[0])
                    setfdata(fees)
                    console.log("info", fees)


                }).catch()

        }
    }
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
                    ffind?.set("copy",`${fees[1]}`)
                    ffind?.set("totalcopy",`${fees[2]}`)
                    ffind?.set("csbool",`${fees[0]}`)
                    ffind?.save().then(v=>console.log(v))
                    setcklist(val)
                    console.log('ccs', val)


                })
                .catch()

        }
    }
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
                        id: id, value: (Number(length[3]))
                    }
                    console.log('aaaprice', val);
                    ffind?.set("nftPrice","0")
                    ffind?.set('csprice',`${cklist?.ck?Number(length[3])/1000000000:Number(length[3])/1000000000000000000}`)
                    
                    ffind?.save().then(v=>console.log("mmm",v))
                    // ffindx?.set("csprice","0").save()
                    
                    setcsprice(val)
                    // setlist(length[1])
                    // setlist2(length[1])
                    // localStorage.setItem(`normasale${id}`, (length[3]))
                    // setpricearr(id)
                    // getallprice(val)
                })
                .catch()

        }
    }
    const buycsdoge = async (collectionid, tokenid) => {
        console.log('buy csdoe')


        let ckamout = cklist?.ck?Number(cspric?.value)/1000000000: Number(cspric?.value)/1000000000000000000
        setShow(true)
        if (acc && web3main && ckamout) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            console.log('all', ckamout)

            let userwalletaddresss = accounts[0];
            // web3main = new Web3(window.ethereum);
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
                            // window.location.reload()
                            ffind?.set('csprice',"0")
                            ffind?.save()
                            history.push('/mycollection')
                            setShow(false)
                        }).catch()
                })
                .catch(() => {
                    setShow(false)

                })
        }
    }
    const buycopiesnft = async (tokenid, boolvalue) => {

        let ckamout = cklist?.ck?Number(cspric?.value)/1000000000: Number(cspric?.value)/1000000000000000000
        setShow(true)
        console.log('bool', boolvalue)
        console.log('boolck', ckamout)

        if (acc && web3main && ckamout) {

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            if (boolvalue) {
                let tokenaddress = token;
                const ercContract = await new web3main.eth.Contract(ERC20, tokenaddress);
                let amountADesired = web3main.utils.toBN(fromExponential(parseInt((parseFloat(ckamout)) * Math.pow(10, 9))));
                ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                    .then((res) => {
                        console.log(res);
                        let swaping = new web3main.eth.Contract(nft, addrs)
                        swaping.methods.buycopies(tokenaddress, tokenid,userwalletaddresss).send({ from: userwalletaddresss })
                            .then((fees) => {
                                console.log(fees);
                                window.location.reload()
                            }).catch((err) => {
                                setShow(false)
                            })
                    })
                    .catch(() => {
                        setShow(false)

                    })
            }
            else {
                console.log('checked', ckamout)
                let amountIn = web3main.utils.toBN(fromExponential((ckamout) * Math.pow(10, 18)));
                console.log('amoutck', amountIn)
                let tokenaddress = '0x0000000000000000000000000000000000000000'
                console.log('checked', tokenid)
                swaping.methods.buycopies(tokenaddress, tokenid,userwalletaddresss).send({ from: userwalletaddresss, value: amountIn })
                    .then((recipt) => {
                        // console.log(recipt);
                        setShow(false)
                        localStorage.removeItem(`buylist${tokenid}`)
                        window.location.reload(true)
                    })
                    .catch((err) => {
                        console.log(err)
                        setShow(false)

                    })

            }
        }
    }

    return (

        <>
        {!fdata && !acc?
            ffind?.attributes?
            <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-5">
                        <div className="item-info">
                            <div className="item-thumb coll-img text-center">
                                <img src={`https://ipfs.infura.io/ipfs/${ffind?.attributes?.nftImg}`} alt="" />
                            </div>
                            {/* <div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={this.state.initData.date} />
                                </div> */}
                           
                           

                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        {/* Content */}
                        <div style={{textTransform:'capitalize'}} className="content mt-5 mt-lg-0">
                            <h3 style={{fontSize:'30px',color:'#99B7FF',textTransform:'capitalize',fontFamily:"Georgia, 'Times New Roman', Times, serif"}} className="m-0">{ffind?.attributes?.nftName}</h3>
                            <p style={{ fontSize: '15px', textTransform: 'capitalize',fontFamily:"Georgia, 'Times New Roman', Times, serif" }}>{ffind?.attributes?.nftDes}</p>
                            {/* Owner */}
                            <div className="owner d-flex align-items-center">
                                <span>Owned By</span>
                                <a className="owner-meta d-flex align-items-center ml-3" >
                                    <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${ffind?.attributes?.nftImg}`} alt="" />
                                    <h6 style={{textTransform:'capitalize'}} className="ml-2">{ffind?.attributes?.nftOwner}</h6>
                                </a>
                            </div>
                            {/* Item Info List */}
                            <div className="item-info-list mt-4">
                                
                            </div>
                            <div className="row items">

                                

                                <div className="col-12 item px-lg-2">
                                    <div className="card no-hover">
                                        <h4 className="mt-0 mb-2">Price</h4>
                                        <div className="price d-flex justify-content-between align-items-center">
                                            <span>{ffind?.attributes?.csprice} {ffind?.attributes?.csbool==="true"?"CSDOGE":"BNB"}</span>
                                            <span>{ffind?.attributes?.copy} of {ffind?.attributes?.totalcopy} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            

                        </div>
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
            </div>
        </section>:<div style={{height:'80vh',display:'flex', paddingTop:'50vh',justifyContent:'center',alignContent:'center'}}>
                    <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />

                    </div>
        :
        fdata?
        <section className="item-details-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-5">
                        <div className="item-info">
                            <div className="item-thumb coll-img text-center">
                                <img src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                            </div>
                            {/* <div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={this.state.initData.date} />
                                </div> */}
                            {
                                buyaucprice > 0 ?

                                    <div className="card no-hover countdown-times my-4">
                                        <div className="countdow  d-flex justify-content-center " >
                                            <h5 style={{ fontSize: '20px', marginRight: '10px' }}><span style={{ fontWeight: 'bold' }}></span>{time?.d} Days</h5>
                                            <h5 style={{ fontSize: '20px', marginRight: '10px' }}><span style={{ fontWeight: 'bold' }}></span>{time?.h} Hours</h5>
                                            <h5 style={{ fontSize: '20px', marginRight: '10px' }}><span style={{ fontWeight: 'bold' }}></span>{time?.m} Minutes</h5>
                                        </div>
                                    </div> : null
                            }
                           

                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        {/* Content */}
                        <div style={{textTransform:'capitalize'}} className="content mt-5 mt-lg-0">
                            <h3 style={{fontSize:'30px',color:'#99B7FF',textTransform:'capitalize',fontFamily:"Georgia, 'Times New Roman', Times, serif"}} className="m-0">{fdata[1]}</h3>
                            <p style={{ fontSize: '15px', textTransform: 'capitalize',fontFamily:"Georgia, 'Times New Roman', Times, serif" }}>{fdata[5]}</p>
                            {/* Owner */}
                            <div className="owner d-flex align-items-center">
                                <span>Owned By</span>
                                <a className="owner-meta d-flex align-items-center ml-3" >
                                    <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                                    <h6 style={{textTransform:'capitalize'}} className="ml-2">{fdata[3]}</h6>
                                </a>
                            </div>
                            {/* Item Info List */}
                            <div className="item-info-list mt-4">
                                
                            </div>
                            <div className="row items">

                                {buyaucprice ?
                                    <div className="col-12 item px-lg-2">
                                        <div className="card no-hover">
                                            <h4 className="mt-0 mb-2">Highest Bid</h4>
                                            <div className="price d-flex justify-content-between align-items-center">
                                                <span>{buyaucprice > auch?.val ? buyaucprice : auch?.val}</span>
                                                <span>{buyaucprice}</span>
                                            </div>
                                        </div>
                                    </div> : null}

                                <div className="col-12 item px-lg-2">
                                    <div className="card no-hover">
                                        <h4 className="mt-0 mb-2">Price</h4>
                                        <div className="price d-flex justify-content-between align-items-center">
                                            <span>{cklist?.ck?Number(cspric?.value)/1000000000:Number(cspric?.value)/1000000000000000000} {cklist?.ck ? "CSDOGE" : "BNB"}</span>
                                            <span>{cklist?.copy} of {cklist?.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                cklist?.copy === 0 ? cklist?.ck ? <button className="btn btn-bordered-white btn-smaller mt-3 w-100" onClick={() => buycsdoge(fdata[7], fdata[0])}>Buy</button> : <button className="btn btn-bordered-white btn-smaller mt-3 w-100" onClick={() => buyfixednft(fdata[7], fdata[0])}>Buy</button> : cklist?.ck ? <button className="btn btn-bordered-white btn-smaller mt-3 w-100" onClick={() => buycopiesnft(fdata[0], true)}>Buy</button> : <button className="btn btn-bordered-white btn-smaller mt-3 w-100" onClick={() => buycopiesnft(fdata[0], false)}>Buy</button>
                            }

                        </div>
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
            </div>
        </section>:<div style={{height:'80vh',display:'flex', paddingTop:'50vh',justifyContent:'center',alignContent:'center'}}>
                    <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />

                    </div>
}
        </>
    );
}


export default Csdetail;