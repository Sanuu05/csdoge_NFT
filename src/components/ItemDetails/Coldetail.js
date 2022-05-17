import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import nft from '../../abi/nft.json'
import Web3 from 'web3'
import { addrs } from '../../abi/address'
// import { Link } from 'react-router-dom';
import ExploreFive from '../../components/Explore/ExploreTwo';
import Allasset from '../Explore/Allasset'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Modal, Spinner } from 'react-bootstrap'

const initData = {
    itemImg: "/img/auction_2.jpg",
    date: "2022-03-30",
    tab_1: "Bids",
    tab_2: "History",
    tab_3: "Details",
    ownerImg: "/img/avatar_1.jpg",
    itemOwner: "Themeland",
    created: "15 Jul 2021",
    title: "Walking On Air",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    price_1: "1.5 ETH",
    price_2: "$500.89",
    count: "1 of 5",
    size: "14000 x 14000 px",
    volume: "64.1",
    highest_bid: "2.9 BNB",
    bid_count: "1 of 5",
    btnText: "Place a Bid"
}

// const tabData_1 = [
//     {
//         id: "1",
//         img: "/img/avatar_1.jpg",
//         price: "14 ETH",
//         time: "4 hours ago",
//         author: "@arham"
//     },
//     {
//         id: "2",
//         img: "/img/avatar_2.jpg",
//         price: "10 ETH",
//         time: "8 hours ago",
//         author: "@junaid"
//     },
//     {
//         id: "3",
//         img: "/img/avatar_3.jpg",
//         price: "12 ETH",
//         time: "3 hours ago",
//         author: "@yasmin"
//     }
// ]

// const tabData_2 = [
//     {
//         id: "1",
//         img: "/img/avatar_6.jpg",
//         price: "32 ETH",
//         time: "10 hours ago",
//         author: "@hasan"
//     },
//     {
//         id: "2",
//         img: "/img/avatar_7.jpg",
//         price: "24 ETH",
//         time: "6 hours ago",
//         author: "@artnox"
//     },
//     {
//         id: "3",
//         img: "/img/avatar_8.jpg",
//         price: "29 ETH",
//         time: "12 hours ago",
//         author: "@meez"
//     }
// ]

const sellerData = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        seller: "@ArtNoxStudio",
        post: "Creator"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        seller: "Virtual Worlds",
        post: "Collection"
    }
]


function Colmaindetail({ acc, web3main }) {
    const [accountid, setaccountid] = useState()
    const location = useLocation()
    const fdata = location.state
    // console.log('aasdda',Object.keys(fdata).length)
    const [mfdata, setfmadata] = useState()
    const { colid } = useParams()
    const dataa = useMoralisQuery('CREATECSDOGECOL')
    console.log('addfff', dataa?.data)
    useEffect(() => {
        if (acc && web3main) {
            collectiondetailsnew(colid)

        }



    }, [colid, acc, web3main])
    useEffect(async () => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            setaccountid(accounts[0])
            console.log('account', accounts)
        }

    }, [acc, web3main])
    console.log("accountid", accountid)


    const collectiondetailsnew = async (id) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("fff", fees);
                    // setactive(id)
                    // getalllist(fees)
                    setfmadata(fees)


                }).catch()

        }
    }
    const ffind = dataa?.data?.find((v) => v?.attributes?.collectionId === colid)
    console.log("ddiing", mfdata)
    return (
        <>
            {!mfdata && !acc ?
                ffind?.attributes ? <>
                    <section className="item-details-area">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-12 col-lg-5">
                                    <div className="item-info">
                                        <div className="item-thumb coll-img text-center" >
                                            <img src={`https://ipfs.infura.io/ipfs/${ffind?.attributes?.collectionImg}`} alt="" />
                                        </div>

                                        <div className="tab-content" id="nav-tabContent">


                                            <div className="tab-pane fade" id="nav-profile">
                                                <ul className="list-unstyled">
                                                    {/* Single Tab List */}
                                                    {sellerData.map((item, idx) => {
                                                        return (
                                                            <li key={`tdt_${idx}`} className="single-tab-list d-flex align-items-center">
                                                                {/* <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" /> */}
                                                                {/* <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.author}</a></p> */}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="tab-pane fade" id="nav-contact">
                                                {/* Single Tab List */}
                                                <div className="owner-meta d-flex align-items-center mt-3">
                                                    <span>Owner</span>
                                                    <a className="owner d-flex align-items-center ml-2" href="/author">
                                                        {/* <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" /> */}
                                                        <h6 className="ml-2">{ffind?.attributes?.collectionName}</h6>
                                                    </a>
                                                </div>
                                                <p className="mt-2">Created :{ffind?.attributes?.displayName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    {/* Content */}
                                    <div className="content mt-5 mt-lg-0">
                                        <h3 className="m-0" style={{ fontSize: '30px', color: '#99B7FF', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{ffind?.attributes?.collectionName}</h3>

                                        <p>{ffind?.attributes?.collectionDescription}</p>
                                        <h3 className="m-0" style={{ fontSize: '15px', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{ffind?.attributes?.displayName}</h3>
                                        <p>{ffind?.attributes?.websiteUrl}</p>

                                        {/* Owner */}
                                        <div className="owner d-flex align-items-center">
                                            <span>Owned By</span>
                                            <a className="owner-meta d-flex align-items-center ml-3">
                                                <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${ffind?.attributes?.collectionImg}`} alt="" />
                                                <h6 className="ml-2">{ffind?.attributes?.collectionName} </h6>
                                            </a>
                                        </div>
                                        {/* Item Info List */}



                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Allasset />
                </> : <div style={{height:'80vh',display:'flex', paddingTop:'50vh',justifyContent:'center',alignContent:'center'}}>
                    <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />

                    </div> :

                <>{
                    mfdata ?
                        <>
                            <section className="item-details-area">
                                <div className="container">
                                    <div className="row justify-content-between">
                                        <div className="col-12 col-lg-5">
                                            <div className="item-info">
                                                <div className="item-thumb coll-img text-center" >
                                                    <img src={`https://ipfs.infura.io/ipfs/${mfdata ? mfdata[6] : null}`} alt="" />
                                                </div>

                                                <div className="tab-content" id="nav-tabContent">


                                                    <div className="tab-pane fade" id="nav-profile">
                                                        <ul className="list-unstyled">
                                                            {/* Single Tab List */}
                                                            {sellerData.map((item, idx) => {
                                                                return (
                                                                    <li key={`tdt_${idx}`} className="single-tab-list d-flex align-items-center">
                                                                        {/* <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" /> */}
                                                                        {/* <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.author}</a></p> */}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-contact">
                                                        {/* Single Tab List */}
                                                        <div className="owner-meta d-flex align-items-center mt-3">
                                                            <span>Owner</span>
                                                            <a className="owner d-flex align-items-center ml-2" href="/author">
                                                                {/* <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" /> */}
                                                                <h6 className="ml-2">{mfdata ? mfdata[2] : null}</h6>
                                                            </a>
                                                        </div>
                                                        <p className="mt-2">Created :{mfdata ? mfdata[4] : null}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            {/* Content */}
                                            <div className="content mt-5 mt-lg-0">
                                                <h3 className="m-0" style={{ fontSize: '30px', color: '#99B7FF', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{mfdata ? mfdata[2] : null}</h3>

                                                <p>{mfdata ? mfdata[5] : null}</p>
                                                <h3 className="m-0" style={{ fontSize: '15px', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{mfdata ? mfdata[3] : null}</h3>
                                                <p>{mfdata ? mfdata[4] : null}</p>

                                                {/* Owner */}
                                                <div className="owner d-flex align-items-center">
                                                    <span>Owned By</span>
                                                    <a className="owner-meta d-flex align-items-center ml-3">
                                                        <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${mfdata ? mfdata[6] : null}`} alt="" />
                                                        <h6 className="ml-2">{mfdata ? mfdata[2] : null}</h6>
                                                    </a>
                                                </div>
                                                {/* Item Info List */}

                                                {
                                                    mfdata[1].toLowerCase() === accountid?.toLowerCase() ?

                                                        <Link className="d-block ckbtn btn btn-bordered-white mt-4" to={"/assetcreate/" + mfdata[0]}>Create new Asset</Link> : null}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <ExploreFive colid={mfdata[0]} web3main={web3main} />
                        </> : <div style={{height:'80vh',display:'flex', paddingTop:'50vh',justifyContent:'center',alignContent:'center'}}>
                    <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />
                                                <Spinner animation="grow" variant="light" />

                    </div>}
                </>
            }

        </>
    );
}


export default Colmaindetail;