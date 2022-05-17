import React, { Component, useEffect, useState } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { addrs, userid } from '../../abi/address'
import { useHistory } from 'react-router';
import axios from 'axios'
import fromExponential from 'from-exponential'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useMoralis, useMoralisQuery } from "react-moralis";
const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function Createcsdoge({ acc, web3main }) {
    console.log('css', acc)

    const [img, setimg] = useState();
    const [buffer, setbuffer] = useState();

    const [displayimage, setdisplayimg] = useState();
    const [data, setdata] = useState({
        collectionName: "", displayName: "", websiteUrl: "", collectionDescription: "", marketFee: "0"
    })


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [copies, setcopies] = useState()
    const [ownername, setownername] = useState()
    const [assetname, setassetname] = useState()
    const [assetimg, setassetimg] = useState()
    const [assetdescrip, setassetdescrip] = useState()
    const history = useHistory()
    const [tokenid, settokenid] = useState()
    const [pay, setpay] = useState()
    const [price, setprice] = useState()
    const [aid, setaid] = useState()
    const [checkval, setcheckval] = useState(true)
    const [accountid, setaccountid] = useState()
    useEffect(async () => {
        if (acc && web3main) {
            const accounts1 = await web3main.eth.getAccounts();
            setaccountid(accounts1[0])
        }

    }, [acc, web3main])
    console.log('assetname', assetname)
    const { Moralis } = useMoralis();
    const choosepic = (e) => {
        setimg(e.target.files[0])
        const file = e.target.files[0];
        const render = new FileReader()
        render.onload = () => {
            if (render.readyState === 2) {
                setdisplayimg(render.result)
            }
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadend = () => {
                const buffer = Buffer.from(reader.result);
                setbuffer(buffer);
                //   console.log('buffer', buffer)
            }
        }
        render.readAsDataURL(e.target.files[0])
    }
    const submit = async (e) => {
        e.preventDefault()
        console.log('dd', data)
        await ipfs.add(buffer, (error, result) => {
            console.log("ipfs result", result[0].hash);
            console.log(result[0].hash);
            mintcsdoge(result[0].hash);
            if (error) {
                console.error(error)
                return;
            }
        })

    }

    // const submit = (e) => {
    //     e.preventDefault()
    //     const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //     //we gather a local file from the API for this example, but you can gather the file from anywhere
    //     let data = new FormData();
    //     data.append('file', img);
    //     return axios.post(url,
    //         data,
    //         {
    //             headers: {
    //                 'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
    //                 'pinata_api_key': "ec9effdc900b62256d28",
    //                 'pinata_secret_api_key': "9d335121cc2b2dd362b4a1c0de445d91a04017c4428a35003c02395e56e4f8ab"
    //             }
    //         }
    //     ).then(function (response) {
    //         //handle response here
    //         console.log("hash",response?.data?.IpfsHash)
    //         // swaps(response?.data?.IpfsHash);
    //         mintcsdoge(response?.data?.IpfsHash)
    //     }).catch(function (error) {
    //         //handle error here
    //         console.log('err',error)
    //     });
    // };
    const mintcsdoge = async (e) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            // settokenid(accounts)
            setShow(true)
            console.log('price', price)
            // alert(checkval)
            console.log('mint-csdoge')
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            let collectionid = 1;
            swaping.methods.createcsdoge(collectionid, userwalletaddresss, e, assetname, ownername, assetdescrip, copies).send({ from: userwalletaddresss })
                .then((fees) => {

                    console.log(fees);
                    if (fees.status === true) {
                        //   history.goBack('/create') 
                        const GameScore = Moralis.Object.extend("CREATECSDOGENFT");
                        const gameScore = new GameScore();
                        gameScore.set("nftName", assetname);
                        gameScore.set("nftOwner", ownername);
                        gameScore.set("csprice", `${price}`);
                        gameScore.set("csbool", `${checkval}`);
                        gameScore.set("nftDes", assetdescrip);
                        gameScore.set("nftImg", e);
                        gameScore.set("totalcopy", `${copies}`);
                        gameScore.set("collectionId", "1");
                        gameScore.set("nftId", fees?.events?.Transfer?.returnValues?.tokenId);
                        gameScore.save()
                            .then((v) => {
                                console.log("cccc", v)
                            })
                        nftidn()
                    } else {
                        alert('failed')
                    }
                }).catch((err) => {

                    // settokenid('')
                    setShow(false)
                    // setpay('')
                    // console.log('erre')
                })


        }
    }
    const nftidn = async () => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((id) => {
                    // console.log('iddnew',String(Number(id)+1));
                    console.log("idd", id)
                    fixedsale(id)

                })
                .catch()

        }
    }
    const fixedsale = async (tokenid) => {
        // console.log('akhj', price)
        // console.log('tokenakhj', tokenid)
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            console.log(accounts);
            // settokenid(accounts)
            setShow(true)
            // setpay('')
            let userwalletaddresss = accounts[0];
            console.log('ack', accounts)
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            if (checkval) {
                let amount = web3main.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 9))));
                console.log('mainamout', amount)

                swaping.methods.fixedsales(tokenid, amount, checkval).send({ from: userwalletaddresss })
                    .then((length) => {
                        console.log(length);
                        if (length.status === true) {
                            // settokenid('')
                            // setpay('suceess')
                            // setShow(true)
                            setShow(false)
                            history.push('/csdoge')
                        } else {
                            alert('failed')
                        }
                    })
                    .catch((err) => {
                        // settokenid('')
                        setShow(false)
                        // setpay('')
                    })

            } else {
                let amount = web3main.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));
                console.log('mainamout', amount)

                swaping.methods.fixedsales(tokenid, amount, checkval).send({ from: userwalletaddresss })
                    .then((length) => {
                        console.log(length);
                        if (length.status === true) {
                            // settokenid('')
                            // setpay('suceess')
                            // setShow(true)
                            setShow(false)
                            history.push('/csdoge')
                        } else {
                            alert('failed')
                        }
                    })
                    .catch((err) => {
                        // settokenid('')
                        setShow(false)
                        // setpay('')
                    })

            }


        }
    }


    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-md-4">
                        {/* Author Profile */}
                        <AuthorProfile sendpic={displayimage} />
                    </div>
                    <div className="col-12 col-md-7">
                        {/* Intro */}
                        <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <span>Get Started</span>
                                <h3 className="mt-3 mb-0">Create Csdoge</h3>
                            </div>
                        </div>
                        {/* Item Form */}
                        <form className="item-form card no-hover" onSubmit={submit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group form-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={choosepic} id="inputGroupFile01" />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="csname" placeholder="Cs Owner Name" onChange={(e) => setownername(e.target.value)} required="required" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="dname" onChange={(e) => setassetname(e.target.value)} placeholder="Asset Name" required="required" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" name="textarea" placeholder="Description" onChange={(e) => setassetdescrip(e.target.value)} cols={30} rows={3} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group ">
                                        <input type="number" className="form-control" name="copies" min="0" placeholder="Copies" onChange={(e) => setcopies(e.target.value)} required="required" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input type="number" className="form-control" name="price" min="0" step="any" placeholder="Price" onChange={(e) => setprice(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group row">
                                        <div className="col-12 md-6 ">
                                            <label for="html">BNB</label>
                                            <input type="radio" id="bnb" name="fav_language" checked={checkval === false} onClick={() => setcheckval(false)} />
                                        </div>
                                        <div className="col-12 md-6">
                                            <label for="ETH" >CSDOGE</label>
                                            <input type="radio" id="ETH" name="fav_language" checked={checkval === true} onClick={() => setcheckval(true)} />
                                        </div>


                                    </div>
                                </div>

                                <div className="col-12">
                                    <button type='submit' className="btn w-100 mt-3 mt-sm-4" >Create Csdoge</button>
                                </div>
                            </div>
                        </form>
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
    );
}


export default Createcsdoge;