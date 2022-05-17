import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import Web3 from 'web3'
import nft from '../../abi/nft.json'
// import { Link } from 'react-router-dom';

import { addrs, sitelink } from '../../abi/address'

import { Modal, Spinner } from 'react-bootstrap'
import ExploreFive from '../../components/Explore/ExploreTwo';
import fromExponential from 'from-exponential';
import { useMoralis, useMoralisQuery } from "react-moralis";
import ExploreTwo from '../../components/Explore/ExploreOne';
import AuctionOne from '../../components/Auctions/AuctionsOne'

function ItemDetails({ acc, web3main }) {
    const location = useLocation()
    // const fdata = location.state
    const { nftid } = useParams()
    useEffect(() => {
        if (nftid) {
            window.scrollTo(0, 0)
        }
    }, [nftid])


    const [buyprice, setbuyprice] = useState()
    const [buyaucprice, setaucbuyprice] = useState()
    const [openbid, setopenbid] = useState()
    const [auch, setauch] = useState()
    const [auctionprice, setauctionprice] = useState()
    const [time, settime] = useState()
    const [accountid, setaccountid] = useState()
    const [hour, sethour] = useState()
    const [days, setdays] = useState()
    const [saleval, setsaleval] = useState()
    const [auctionval, setauctionvalue] = useState()
    const [show, setShow] = useState(false);
    const [fdata, setfdata] = useState()
    const handleClose = () => setShow(false);
    const [aucstat, setaucstat] = useState()
    const [nowner, setnowner] = useState()
    const [upgrade, setupgrade] = useState()
    // console.log('ssa', buyprice)
    // console.log('€auc ssa', auctionprice)
    const { Moralis } = useMoralis();
    const history = useHistory()
    const [checkval, setcheckval] = useState(true)
    const dataa = useMoralisQuery('CREATECSDOGENFT')
    const [newbid, setnewbid] = useState("")

    useEffect(async () => {

        if (acc && web3main) {
            const accounts1 = await web3main.eth.getAccounts();
            setaccountid(accounts1[0])
            if (nftid) {
                salenft(nftid)
                auctiondetail(nftid)
                timer(nftid)
                nftinfo(nftid)
                aucstatm(nftid)
                owner(nftid)

            }
        }
    }, [nftid, acc, dataa?.data?.length, web3main])
    console.log('addfff', dataa?.data)
    console.log('vvvv', nftid)
    const ffind = dataa?.data?.find((v) => v?.attributes?.nftId === nftid)
    const fitem = dataa?.data?.find((v) => v?.attributes?.nftId === nftid)
    console.log('accoutid', fitem)


    const salenft = async (id) => {
        // console.log('2')
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('aaa', length[2]);
                    // setlist(length[0])
                    // setlist2(length[1])
                    // console.log('listone',length[0])
                    setbuyprice((Number(length[3])) / 1000000000000000000)
                    setaucbuyprice(((Number(length[2])) / 1000000000000000000))
                    // setcheckm(length[0])
                    ffind?.set('collectionId', fdata ? fdata[7] : null)
                    ffind?.set('nftPrice', `${((Number(length[3])) / 1000000000000000000)}`)
                    ffind?.set('auction', `${(((Number(length[2])) / 1000000000000000000))}`)
                    ffind?.set('csprice', "0")

                    ffind?.save()
                    // var listlen = length[0]?.length
                    // // console.log('bn',length)
                    // setaucprice(Number(length[2]))


                })
                .catch()

        }
    }
    const buyfixednft = async (collectionid, tokenid, amount) => {
        // console.log(`${collectionid}, ${tokenid}, ${amount}`)



        if (acc && web3main) {

            //  console.log(accounts);
            setShow(true)

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
            // console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid, address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    ffind?.set('nftPrice', "0")
                    ffind?.save()
                    setShow(false)

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
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.auctiondetail(id).call({ from: userwalletaddresss })
                .then((value) => {
                    // console.log('assasacvbv',value);     
                    // localStorage.setItem(`highauc${id}`, value[0])
                    // localStorage.setItem(`highaucid${id}`, value[1])
                    console.log('ccc', value)
                    var aucde = {
                        id: value[1],
                        val: (Number(value[0]))?.length > 21 ? Number(value[0]) / 1000000000000000000000000000000000000 : Number(value[0]) / 1000000000000000000,
                        userid: id
                    }
                    ffind?.set('highauch', `${((Number(value[0]))?.length > 21 ? Number(value[0]) / 1000000000000000000000000000000000000 : Number(value[0]) / 1000000000000000000)}`)
                    ffind?.save().then((v) => console.log(v))
                    setauch(aucde)
                    console.log('auction high bid', aucde)
                }).catch()

        }
    }
    const aucstatm = async (tokenid) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.nftauctionend(tokenid).call({ from: userwalletaddresss })
                .then((length) => {
                    console.log("alll", length);
                    setaucstat(length)
                })
                .catch()
        }
    }
    const removeauc = async (tokenid) => {
        if (acc && web3main) {

            //  console.log(accounts);
            setShow(true)
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.removesfromauction(tokenid).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    ffind?.set('auction', "0")
                    ffind?.save()

                    window.location.reload()
                })
                .catch()
        }
    }
    const removesale = async (tokenid) => {
        if (acc && web3main) {
            //  console.log(accounts);
            setShow(true)
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.cancelfixedsale(tokenid).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    ffind?.set('nftPrice', "0")
                    ffind?.save()
                    window.location.reload()
                })
                .catch()
        }
    }
    const owner = async (tokenid) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.originalowner(tokenid).call({ from: userwalletaddresss })
                .then((length) => {
                    console.log("aaaa", length);
                    setnowner(length)
                })
                .catch()
        }
    }
    const upgradebtn = async (tokenid) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            setShow(true)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            if (checkval) {


                let amountIn = web3main.utils.toBN(fromExponential((newbid) * Math.pow(10, 18)));
                swaping.methods.upgradeauction(tokenid, checkval).send({ from: userwalletaddresss, value: amountIn })
                    .then((recipt) => {
                        console.log(recipt);
                        window.location.reload()
                    })
                    .catch()
            } else {
                swaping.methods.upgradeauction(tokenid, checkval).send({ from: userwalletaddresss, value: 0 })
                    .then((recipt) => {
                        console.log(recipt);
                        window.location.reload()
                    })
                    .catch()

            }
        }
    }
    const buyauctionnft = async (tokenid, amount) => {
        if (acc && web3main) {

            //  console.log(accounts);
            // settokenid(accounts)
            setShow(true)

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
            swaping.methods.buyauction(tokenid).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    ffind?.set('highauch', `${amount}`)
                    ffind?.save()
                    setShow(false)
                    // history.push('/')
                    window.location.reload()
                })
                .catch((err) => {
                    setShow(false)
                    // settokenid('')
                })
        }
    }
    useEffect(() => {
        if (acc) {
            timer1(nftid)

        }

    }, [acc, nftid, ffind, web3main])
    const timer = async (id) => {
        // console.log('saa',id)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
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
                    // ffind?.set("days",`${days}`)
                    // ffind?.set("hr",`${days}`)
                    // ffind?.set("min",`${days}`)
                    // ffind?.save().then((v)=>console.log(v))



                }).catch()

        }
    }
    const timer1 = async (id) => {
        // console.log('saa',id)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)


            swaping.methods.timing(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    var day = Math.floor(fees / 86400)
                    var hr = Math.floor((fees - day * 86400) / 3600)
                    var minutesout = Math.floor((fees - day * 86400 - hr * 3600) / 60);
                    console.log("hr", hr)
                    console.log("day", day)
                    console.log("min", minutesout)

                    ffind?.set("days", `${day}`)
                    ffind?.set("hr", `${hr}`)
                    ffind?.set("min", `${minutesout}`)
                    ffind?.save().then((v) => console.log(v))
                    settime({ id: id, d: day, h: hr, m: minutesout })


                }).catch()

        }
    }
    const claimauctionnft = async (collectionid, tokenid) => {
        if (acc && web3main) {

            //  console.log(accounts);

            // settokenid(accounts)
            setShow(true)
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            // let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10,18)));
            swaping.methods.claim(collectionid, tokenid).send({ from: userwalletaddresss })
                .then((recipt) => {
                    // console.log(recipt);
                    ffind?.set("auction", "0")
                    ffind?.save()
                    setShow(false)
                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)
                    // settokenid('')
                })
        }
    }
    // console.log('time', time)
    // console.log('fdata', fdata)

    // console.log("mmm", fdata)
    const fixedsale = async (tokenid, price) => {
        // console.log('akhj', price)
        // console.log('tokenakhj', tokenid)
        setShow(true)
        if (acc && web3main) {
            // console.log(accounts);

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amount = web3main.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));
            // console.log('mainamout', amount)

            swaping.methods.fixedsales(tokenid, amount, false).send({ from: userwalletaddresss })
                .then((length) => {
                    // console.log(length);
                    if (length.status === true) {
                        ffind?.set("nftPrice", `${price}`)
                        ffind?.save()
                        setShow(false)
                        history.push('/mycollection')

                    } else {
                        alert('failed')
                    }
                })
                .catch((err) => {
                    setShow(false)

                })

        }
    }
    useEffect(() => {
        if (dataa?.data?.length > 0 && nftid) {
            nftidone(nftid)
        }

    }, [dataa?.data, nftid])
    const nftinfo = async (id) => {
        // console.log('four fun')
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("pop22", fees)
                    setfdata(fees)

                    // getallasset(fees)
                    // const GameScore = Moralis.Object.extend("ALLCSDOGENFTNEW");
                    // const gameScore = new GameScore();
                    // gameScore?.set("nftName", fees[1]);
                    // gameScore?.set("nftId", fees[0]);
                    // gameScore?.set("nftOwner", fees[3]);
                    // gameScore?.set("nftDes", fees[5]);
                    // gameScore?.set("nftImg", fees[6]);
                    // gameScore?.save().then(v=>console.log("vpvp12",v))

                }).catch()

        }
    }
    const nftidone = async (id) => {
        // console.log('four fun')
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then(async (fees) => {
                    console.log("pop221", fees)
                    // setfdata(fees)
                    const findc = await dataa?.data?.find(p => p?.attributes?.nftId === fees[0])
                    console.log("vbvb", findc)
                    if (findc) {
                        console.log('vbvbyesss')

                    } else {
                        // getallasset(fees)
                        console.log('vbvbnoo')
                        const GameScore = Moralis.Object.extend("CREATECSDOGENFT");
                        const gameScore = new GameScore();
                        gameScore?.set("nftName", fees[1]);
                        gameScore?.set("nftId", fees[0]);
                        gameScore?.set("nftOwner", fees[3]);
                        gameScore?.set("nftDes", fees[5]);
                        gameScore?.set("nftImg", fees[6]);
                        gameScore?.save().then(v => console.log('vbvb1', v))

                    }
                    // getallasset(fees)
                    // const GameScore = Moralis.Object.extend("ALLCSDOGENFTNEW");
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

    const auction = async (tokenid, price, endday, endhours) =>
    // console.log('aa',price)
    {
        // console.log('aaaa,', price)
        if (acc && web3main) {
            //  console.log(accounts);

            setShow(true)

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // web3main = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let amountIn = web3main.utils.toBN(fromExponential((price) * Math.pow(10, 18)));

            swaping.methods.startauction(tokenid, amountIn, endday, endhours).send({ from: userwalletaddresss })
                .then((recipt) => {
                    // console.log(recipt);
                    if (recipt.status === true) {
                        ffind?.set("auction", `${price}`)
                        ffind?.set("days", `${endday}`)
                        ffind?.set("hr", `${endhours}`)
                        ffind?.set("min", "0")
                        ffind?.save()

                        setShow(false)
                        history.push('/mycollection')

                    } else {
                        alert('failed')
                    }

                })
                .catch(err => {

                    setShow(false)


                })

        }
    }

    const chekstack = buyaucprice === 0 && buyprice === 0?true:false

    return (
        <div className="length">
            {!fdata & !acc ?
                fitem?.attributes ? <>
                    <section className="item-details-area">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-12 col-lg-5">
                                    <div className="item-info">
                                        <div className="item-thumb coll-img text-center">
                                            <img src={`https://ipfs.infura.io/ipfs/${fitem?.attributes?.nftImg}`} alt="" />
                                        </div>
                                        {
                                            Number(fitem?.attributes?.auction) > 0 ?

                                                <div className="card no-hover countdown-times my-4">

                                                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                                            {/* <p style={{ margin: '0px', fontSize: '20px', color: 'white' }}>Days</p> */}

                                                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold', color: 'black', background: 'white' }}>{fitem?.attributes?.days} </p>
                                                            <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Days</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

                                                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold', color: 'black', background: 'white' }}>{fitem?.attributes?.hr}</p>
                                                            <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Hours</p>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold', color: 'black', background: 'white' }}>{fitem?.attributes?.min}</p>
                                                            <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Minutes</p>
                                                        </div>

                                                    </div>

                                                </div> : null
                                        }




                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    {/* Content */}
                                    <div className="content mt-5 mt-lg-0">
                                        <h3 style={{ fontSize: '30px', color: '#99B7FF', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }} className="m-0">{fitem?.attributes?.nftOwner}</h3>
                                        <p style={{ fontSize: '15px', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{fitem?.attributes?.nftDes}</p>
                                        {/* Owner */}
                                        <div className="owner d-flex align-items-center">
                                            <span>Owned By</span>
                                            <a className="owner-meta no-hover d-flex align-items-center ml-3" >
                                                <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${fitem?.attributes?.nftImg}`} alt="" />
                                                <h6 className="ml-2">{fitem?.attributes?.nftOwner}</h6>
                                            </a>
                                        </div>
                                        {/* Item Info List */}
                                        <div className="item-info-list mt-4">
                                        </div>
                                        <div className="row items">

                                            {Number(fitem?.attributes?.auction) > 0 ?
                                                <div className="col-12 item px-lg-2">
                                                    <div className="card no-hover">
                                                        <h4 className="mt-0 mb-2">Highest Bid</h4>
                                                        <div className="price d-flex justify-content-between align-items-center">
                                                            <span>{Number(fitem?.attributes?.auction) > Number(fitem?.attributes?.highauch) ? Number(fitem?.attributes?.auction) : Number(fitem?.attributes?.highauch)}</span>
                                                            <span>{Number(fitem?.attributes?.auction)}</span>
                                                        </div>
                                                    </div>
                                                </div> : null}
                                            {
                                                Number(fitem?.attributes?.nftPrice) > 0 ? <div className="col-12 item px-lg-2">
                                                    <div className="card no-hover">
                                                        <h4 className="mt-0 mb-2">Price</h4>
                                                        <div className="price d-flex justify-content-between align-items-center">
                                                            <span>{fitem?.attributes?.nftPrice}</span>
                                                            {/* <span>{this.state.initData.bid_count}</span> */}
                                                        </div>
                                                    </div>
                                                </div> : null
                                            }
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
                    </section>
                    {
                        Number(fitem?.attributes?.nftPrice) > 0 ? <ExploreTwo /> : null
                    }
                    {
                        Number(fitem?.attributes?.auction) > 0 ? <AuctionOne /> : null
                    }


                </> : <div style={{ height: '80vh', display: 'flex', paddingTop: '50vh', justifyContent: 'center', alignContent: 'center' }}>
                    <Spinner animation="grow" variant="light" />
                    <Spinner animation="grow" variant="light" />
                    <Spinner animation="grow" variant="light" />
                    <Spinner animation="grow" variant="light" />
                    <Spinner animation="grow" variant="light" />

                </div> :
                fdata ?
                    <>
                        <section className="item-details-area">
                            <div className="container">
                                <div className="row justify-content-between">
                                    <div className="col-12 col-lg-5">
                                        <div className="item-info">
                                            <div className="item-thumb coll-img text-center">
                                                <img src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                                            </div>
                                            {
                                                buyaucprice > 0 ?

                                                    <div className="card no-hover countdown-times my-4">

                                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                                                {/* <p style={{ margin: '0px', fontSize: '20px', color: 'white' }}>Days</p> */}

                                                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold', color: 'black', background: 'white' }}>{time?.d} </p>
                                                                <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Days</p>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

                                                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold', color: 'black', background: 'white' }}>{time?.h}</p>
                                                                <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Hours</p>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', width: '60px', height: '80px', borderRadius: '5px', marginTop: '5px', fontSize: '40px', fontWeight: 'bold', color: 'black', background: 'white' }}>{time?.m}</p>
                                                                <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Minutes</p>
                                                            </div>

                                                        </div>

                                                    </div> : null
                                            }



                                            {
                                                fdata[8].toLowerCase() === accountid?.toLowerCase() ?

                                                    <div className="item-info-list mt-5 card" style={{ borderRadius: '20px' }} >
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault()
                                                            fixedsale(fdata[0], saleval)

                                                        }}>
                                                            <div className="item-info-list mt-4">
                                                                <h3 style={{ fontSize: '25px', color: 'whitesmoke', textTransform: 'capitalize' }}>Sale</h3>
                                                                <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setsaleval(e.target.value)} required />
                                                                <button type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >Sale</button>
                                                            </div>
                                                        </form>
                                                    </div> : null
                                            }


                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        {/* Content */}
                                        <div className="content mt-5 mt-lg-0">
                                            <h3 style={{ fontSize: '30px', color: '#99B7FF', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }} className="m-0">{fdata[1]}</h3>
                                            <p style={{ fontSize: '15px', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{fdata[5]}</p>
                                            {/* JSON.parse(fdata[5])?.des  */}
                                            {/* Owner */}
                                            <div className="owner d-flex align-items-center">
                                                <span>Owned By</span>
                                                <a className="owner-meta no-hover d-flex align-items-center ml-3" >
                                                    <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                                                    <h6 className="ml-2">{fdata[3]}</h6>
                                                </a>
                                            </div>
                                            {/* Item Info List */}
                                            <div className="item-info-list mt-4">
                                            </div>
                                            {time?.d === 0 && time?.h === 0 && time?.m === 0 ? null
                                                : buyaucprice > 0 ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => setupgrade(true)} >Upgrade</button> : null
                                            }
                                            {
                                                upgrade ? <div className="item-info-list mt-4">
                                                    <div className="form-group row my-3">
                                                        <div className="col-12 md-6 ">
                                                            <label for="CLAIM">Claim</label>
                                                            <input type="radio" id="CLAIM" name="fav_language" checked={checkval === false} onClick={() => setcheckval(false)} />
                                                        </div>
                                                        <div className="col-12 md-6">
                                                            <label for="BID" >Bid</label>
                                                            <input type="radio" id="BID" name="fav_language" checked={checkval === true} onClick={() => setcheckval(true)} />
                                                        </div>


                                                    </div>
                                                    {
                                                        checkval ? <input style={{ border: 'none', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" onChange={(e) => setnewbid(e.target.value)} required /> : null
                                                    }
                                                    <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => upgradebtn(fdata[0])}  >{checkval ? "Place Bid" : "Claim"}</button>

                                                </div> : null}
                                            <div className="row items">

                                                {buyaucprice ?
                                                    <div className="col-12 item px-lg-2">
                                                        <div className="card no-hover">
                                                            <h4 className="mt-0 mb-2">Highest Bid</h4>
                                                            <div className="price d-flex justify-content-between align-items-center">
                                                                <span>{buyaucprice > auch?.val ? buyaucprice : auch?.val}</span>
                                                                <span>{buyaucprice}</span>
                                                            </div>
                                                            {
                                                                buyaucprice > auch?.val ? null :
                                                                    <>
                                                                        <h6>Highest Bid User</h6>
                                                                        <span>{auch?.id}</span>
                                                                    </>
                                                            }

                                                        </div>
                                                    </div> : null}
                                                {
                                                    buyprice > 0 ? <div className="col-12 item px-lg-2">
                                                        <div className="card no-hover">
                                                            <h4 className="mt-0 mb-2">Price</h4>
                                                            <div className="price d-flex justify-content-between align-items-center">
                                                                <span>{buyprice}</span>
                                                                {/* <span>{this.state.initData.bid_count}</span> */}
                                                            </div>
                                                        </div>
                                                    </div> : null
                                                }
                                            </div>




                                            {
                                                buyprice > 0 ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => buyfixednft(fdata[7], fdata[0], buyprice)} >BUY</button> : null
                                            }
                                            {
                                                buyprice > 0 && nowner?.toLowerCase() === accountid?.toLowerCase() ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => removesale(fdata[0])} >Cancel</button> : null
                                            }

                                            {/* {chekstack ?
                                                <a href={`${sitelink}/staking/${fdata[0]}`} target="_blank" style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100">Staking</a> : null
                                            } */}
                                            {fdata[8].toLowerCase() === accountid?.toLowerCase() && chekstack ?
                                                <a href={`${sitelink}/staking/${fdata[0]}`} target="_blank" style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100">Staking</a> : null
                                            }

                                            {/* {time?.d === 0 && time?.h === 0 && time?.m === 0 && auch?.id.toLowerCase() === accountid?.toLowerCase() ?
                                                buyaucprice > 0 && !(buyaucprice >= auch?.val) ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => claimauctionnft(fdata[7], fdata[0])}  >CLAIM</button> : buyaucprice > 0 && buyaucprice > auch?.val && nowner?.toLowerCase() === accountid?.toLowerCase() ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => removeauc(fdata[0])} >Cancel Auction</button> : null
                                                : null} */}
                                            {time?.d === 0 && time?.h === 0 && time?.m === 0 && auch?.id.toLowerCase() === accountid?.toLowerCase() ?
                                                (buyaucprice > 0 && auch?.val >= buyaucprice) ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => claimauctionnft(fdata[7], fdata[0])}  >CLAIM</button> : Number(buyaucprice) > 0 && Number(buyaucprice) > auch?.val && nowner?.toLowerCase() === accountid?.toLowerCase() ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => removeauc(fdata[0])} >Cancel Auction</button> : null
                                                : null}
                                            {time?.d === 0 && time?.h === 0 && time?.m === 0 && Number(buyaucprice) > 0 && Number(buyaucprice) > auch?.val && nowner?.toLowerCase() === accountid?.toLowerCase() ? <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => removeauc(fdata[0])} >Cancel Auction</button> : null
                                            }
                                            {openbid ? null :
                                                buyaucprice > 0 ?
                                                    time?.d === 0 && time?.h === 0 && time?.m === 0 ? null :
                                                        <button style={{ border: '2px solid #99B7FF' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => setopenbid(true)} >BID</button> : null
                                            }
                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                buyauctionnft(fdata[0], auctionprice)

                                            }}>
                                                {openbid ?
                                                    <div className="item-info-list mt-4">
                                                        <input style={{ border: 'none', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setauctionprice(e.target.value)} required />

                                                    </div> : null
                                                }
                                                {openbid ?
                                                    buyaucprice > 0 ?
                                                        <button style={{ border: '2px solid #99B7FF' }} type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >BID</button> : null
                                                    : null}
                                            </form>


                                            {
                                                fdata[8].toLowerCase() === accountid?.toLowerCase() ?

                                                    <div className="item-info-list mt-5 card" style={{ borderRadius: '20px' }}>
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault()
                                                            auction(fdata[0], auctionval, days, hour)
                                                        }}>
                                                            <div className="item-info-list mt-4" >
                                                                <h3 style={{ fontSize: '25px', color: 'whitesmoke', textTransform: 'capitalize' }}>Auction</h3>
                                                                <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none', marginBottom: '4px' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setauctionvalue(e.target.value)} required />
                                                                <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none', marginBottom: '4px' }} type="Number" placeholder="Enter Days" min="0" max="30" onChange={(e) => setdays(e.target.value)} required />
                                                                <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)', borderRadius: '5px', outline: 'none', marginBottom: '4px' }} type="Number" placeholder="Enter Hours" min="0" max="24" onChange={(e) => sethour(e.target.value)} required />
                                                                <button type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >Auction</button>
                                                            </div>
                                                        </form>
                                                    </div> : null
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
                        </section>
                        <ExploreFive colid={fdata[7]} ckkid={fdata[1]} acc={acc} web3main={web3main} />
                    </> : <div style={{ height: '80vh', display: 'flex', paddingTop: '50vh', justifyContent: 'center', alignContent: 'center' }}>
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />

                    </div>

            }
        </div>
    );
}


export default ItemDetails;