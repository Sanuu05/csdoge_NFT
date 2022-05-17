import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import nft from '../../abi/nft.json'

import { addrs } from '../../abi/address'
import { Link } from 'react-router-dom';

function MyExplore({web3main}) {
    // const [userdata, setuserdata] = useState([])
    // const [arratdata, setarraydata] = useState([])
    // const [idmain, setid] = useState(0)
    // const [listid, setlistid] = useState([])
    // const [ newdata,setnewdata ] = useState()
    const [alldata, setalldata] = useState([])
    const [spin, setspin] = useState()
    const [alldatan, setalldatan] = useState([])

    // 0xA6bcD1A0725F16a0dc7eF500e1855E530a8BC110

    const userid = JSON.parse(localStorage.getItem('userid'))
    const getlist = userid ? userid.length ? userid[userid.length - 1] : null : null
    console.log('assuserall', alldata)
    // const userdataa = JSON.parse(localStorage.getItem(getlist))
    // console.log('aaa',userdataa)

    useEffect(() => {
        // alert('useeffcet1')
        if(web3main){
        collectionarray()
        }

        // collectionlist()

    }, [web3main])
    const collectionarray = async () => {
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.totalcollectiondetails().call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("fees", fees);
                    for (let i = 0; i < fees?.length; i++) {
                        console.log('lol', fees[i])
                        collectiondetailsnew(fees[i])
                        setspin(fees[i])

                    }
                })
                .catch((err)=>{
                    console.log('ererr',err)
                })

        }
    }
    const collectiondetailsnew = async (id) => {
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("fff", fees);
                    // setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }
    const getalllist = (data) => {
        setalldatan((old) => [
            ...old, data
        ])


    }
    console.log('alldata', alldatan)

    return (

        <section className="popular-collections-area myexpl">
            <div className="container-container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>My Collections</span>
                                <h3 className="mt-3 mb-0">My Collections</h3>
                            </div>
                            {/* <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/explore-2">{this.state.data.btnText}</a>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {alldatan.map((val, idx) => {
                        return (
                            <>{
                                val[0] === "1" ? null :

                                    <div key={`cd_${idx}`} className="col-12 col-sm-6 cscard col-lg-3 item">
                                        <div className="card no-hover text-center">
                                            <div className="image-over maincolimg" >
                                                <Link to={`/col-details/${val[0]}`} >
                                                    <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                </Link>
                                                {/* Seller */}
                                                <Link className="seller" to={`/col-details/${val[0]}`}>
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
                                                        <h5 className="mb-2">{val ? val[2] : null}</h5>
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
                </div>
            </div>
        </section>
    );
}


export default MyExplore;