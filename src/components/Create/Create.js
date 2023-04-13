import React, { Component, useState } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { addrs } from '../../abi/address'
import { useHistory } from 'react-router-dom'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useMoralis,useMoralisQuery } from "react-moralis";
import axios from 'axios'
const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function Create({acc , web3main}) {

    console.log('assetimgacc', acc)
    const [img, setimg] = useState();
    const [buffer, setbuffer] = useState();

    const [displayimage, setdisplayimg] = useState();
    const [data, setdata] = useState({
        collectionName: "", displayName: "", websiteUrl: "", collectionDescription: "", marketFee: "0"
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const { Moralis } = useMoralis();
    const history = useHistory()
    const dataa = useMoralisQuery('CREATECSDOGECOL')
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
        if(e.target.files[0]){
            render.readAsDataURL(e.target.files[0]);
          }
    }
    const submit = async (e) => {
        e.preventDefault()
        
        console.log('dd', data)
        await ipfs.add(buffer, (error, result) => {
            // console.log("ipfs result",result[0].hash);
            console.log(result[0].hash);
            swaps(result[0].hash);
            if (error) {
                console.error(error)
                return;
            }
        })

    }

    const swaps = async (e) => {
        if (acc && web3main) {
            // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // console.log(accounts);
            //  settokenid(accounts)
           
            // setpay('')
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack',accounts)
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            setShow(true)

            swaping.methods.createcollection(data.collectionName, data.displayName, data.websiteUrl, data.collectionDescription, e, parseInt(data.marketFee)).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    if (fees.status === true) {
                        // settokenid('')
                        // setpay('suceess')
                        const GameScore = Moralis.Object.extend("CREATECSDOGECOL");
                        const gameScore = new GameScore();
                        gameScore.set("collectionName", data.collectionName);
                        gameScore.set("displayName", data.displayName);
                        gameScore.set("websiteUrl", data.websiteUrl);
                        gameScore.set("collectionDescription", data.collectionDescription);
                        gameScore.set("collectionImg", e);
                        gameScore.set("collectionId",`${dataa?.data.length+1}`);

                        gameScore.save()
                        .then((v)=>{
                            console.log("cccc",v)
                        })
                        setShow(false)
                        history.push('/mycollection')
                    }
                    else {
                        // alert(' failed')

                    }


                }).catch((err) => {
                    // settokenid('')
                    setShow(false)
                    // setpay('')
                    // console.log('erre')
                })
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
                                <h3 className="mt-3 mb-0">Create Collection</h3>
                            </div>
                        </div>
                        {/* Item Form */}
                        <form className="item-form card no-hover" onSubmit={submit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group form-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={choosepic} id="inputGroupFile01" />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Upload Image</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="name" placeholder="Collection Name" onChange={(e) => setdata({ ...data, collectionName: e.target.value })} required="required" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" name="textarea" placeholder="Description" onChange={(e) => setdata({ ...data, collectionDescription: e.target.value })} cols={30} rows={3} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="dname" onChange={(e) => setdata({ ...data, displayName: e.target.value })} placeholder="Display Name" required="required" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="url" onChange={(e) => setdata({ ...data, websiteUrl: e.target.value })} placeholder="Website URL" required="required" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Collection</button>
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


export default Create;