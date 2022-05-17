import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link } from 'react-router-dom';



import { addrs } from '../../abi/address'
import { useMoralis, useMoralisQuery } from "react-moralis";
function AuctionsOne({auc,acc, web3main}) {
    console.log('aucaucc',acc)
    // const [active, setactive] = useState('auction')
    const [list, setlist] = useState([])
    // const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const [mainlist, setmainlist] = useState([])
    // const [mainlistauc, setmainlistauc] = useState([])
    const [arr, setArr] = useState([]);
    // const [arrauc, setArrauc] = useState([]);
    // const [price, setprice] = useState([])
    const [pricearr, setpricearr] = useState()
    // const [newlist, setnewlist] = useState([])
    // const [payvalue, setpayvalue] = useState()
    // const [highauc, sethighauc] = useState()
    // const [highauid, sethighauid] = useState()
    // const [modaldatao, setmodaldatao] = useState()
    // const [modaldatac, setmodaldatac] = useState()
    // const [modaldatai, setmodaldatai] = useState()
    // const [modaldataaa, setmodaldataaa] = useState()
    // const [modaldatap, setmodaldatap] = useState()
    // const [modaldatacol, setmodaldatacol] = useState()
    // const [modaldatatok, setmodaldatatok] = useState()
    const [exprice, setexprice] = useState()
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    const [allhighp, setallhighp] = useState([])
    const [timew, settimew] = useState([])
    // const [p1, setp1] = useState()
    // const [p2, setp2] = useState()
    // const [tokenid, settokenid] = useState()
    const [colllist,setcolllist] = useState()
    const [alldata,setalldata] = useState([])
    const [chainid,setchainid] = useState()



    const [accountid, setaccountid] = useState()
    useEffect(async () => {
        if(acc && web3main){
        // const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts1 = await web3main.eth.getAccounts();
        setaccountid(accounts1[0])
        // const chainId = await window.ethereum.request({ method: 'eth_chainId' });
       
        // setchainid(chainId)
       
        }
    }, [acc, web3main])
    console.log('lokkk',{chainid,acc})
    useEffect(() => {
        if(acc && web3main ){
            salenft(0)
            // alert('hello')

        }

        

    }, [acc , web3main])


    const salenft = async (id) => {
        console.log('2')
        if (acc && web3main ) {
            

            // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });


            // let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            // let swaping = web3main.Contract(nft, addrs)
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            console.log('ack',accounts)
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('listlist', length);
                    setlist(length[1])
                    // setlist2(length[1])
                    var listlen = length[1]?.length
                    // console.log('bnmm', listlen)
                    for (let i = 0; i < listlen; i++) {
                        // console.log('akk',length[0][i])
                        const ll = length[1][i]
                        nftinfo(ll)
                        // salenftprie(length[2])

                    }
                })
                .catch()

        }
    }

    const nftinfo = async (id) => {
        // console.log('4')
        if (acc && web3main ) {
            
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log('aafg', fees);
                    // localStorage.setItem(`buylistauc${id}`, JSON.stringify(fees))
                    setArr(id)
                    savelist(fees)
                    salenftprie(fees[0])


                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }
    console.log('lok', exprice)

    const salenftprie = async (id) => {
        // console.log('poij', id)
        if (acc && web3main ) {
            
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('aaaprice', length);
                    const val = {
                        id: id, value: length[2]
                    }
                    // setlist(length[1])
                    // console.log('asas',val)
                    // setlist2(length[1])
                    // localStorage.setItem(`auctionsale${id}`, (length[2]))
                    setpricearr(id)
                    getallprice(val)
                    timer(id)
                    auctiondetail(id)
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
    console.log('auction price', allp)










    // useEffect(() => {
    //     const interval = setInterval(() => {
    //     //   console.log('This will run every second!');
    //       list?.map((val) => {
    //         timer(val)
    //         auctiondetail(val)
    //         // console.log('aaaaaaa')
    //     })
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, [list,pricearr,price]);
    const timer = async (id) => {
        // console.log('saa',id)
        if (acc && web3main) {
            
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
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
    const settime = (data) => {
        settimew((old => [
            ...old, data
        ]))

    }
    console.log('jkijjh', timew)
    const auctiondetail = async (id) => {
        if (acc && web3main) {
            
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)
            swaping.methods.auctiondetail(id).call({ from: userwalletaddresss })
                .then((value) => {
                    // console.log('assasacvbv',value);     
                    // localStorage.setItem(`highauc${id}`, value[0])
                    // localStorage.setItem(`highaucid${id}`, value[1])
                    var aucde = {
                        id: value[1],
                        val: value[0],
                        userid: id
                    }
                    getallhighprice(aucde)
                }).catch()

        }
    }
    const getallhighprice = (data) => {
        if (data.id === "0") {
            // console.log('notallowed',data)
        } else {
            // console.log('dataaallower',data)
            setallhighp((old) => [
                ...old, data
            ])
        }

    }
    console.log('auction popeicehigh', allhighp)
    useEffect(async () => {
        if(acc && web3main )
        {
        
        totalcolection()
    }

    }, [acc,web3main])
    const totalcolection = async () => {

        if (acc && web3main) {
            // setshow(true)

            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            console.log('ccc', userwalletaddresss)
            let swaping = new web3main.eth.Contract(nft, addrs)

            swaping.methods.collectionform().call({ from: userwalletaddresss })
                .then((length) => {
                    setcolllist(length)
                    console.log('lklength', length)

                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
            // setspin(i)
        }


    }, [colllist])
    const collectiondetails = async (id) => {
        if (acc && web3main) {
            const accounts = await web3main.eth.getAccounts();
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
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
    console.log('aallcoll', allhighp)

    const dataa = useMoralisQuery('CREATECSDOGENFT')
    console.log('dataaaaall', dataa?.data)
    const fildata = dataa?.data?.filter((v)=>Number(v?.attributes?.auction)>0)
    console.log('fildata1',allfixed)
    console.log('fildata2',chainid)
    console.log('fildata3',acc)


    return (
        <section className="popular-collections-area mauction">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        {
                            auc==="auc"?null:<div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Auctions</span>
                                {/* <h3 className="mt-3 mb-0">Auctions</h3> */}
                            </div>
                            
                            <div className="intro-btn">
                                <a className="btn content-btn text-left" href="/auctions">Auctions</a>
                            </div>
                        </div>
                        }
                        
                    </div>
                </div>
                {
                    allfixed  && acc?
                    <div className="row items">
                    {auc==="auc"?
                    allfixed?.map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center ">
                                    <div className="image-over aucimg" >
                                        <Link to={`/item-details/${val[0]}`} >
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
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                                            <div className="countdown-times mb-3">
                                                <div className="countdown px-5"  >

                                                    {
                                                        timew.map((t) => {
                                                            if (t.id === val[0]) {
                                                                return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Days</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{t?.d} </p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Hours</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{t?.h}</p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Minutes</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{t?.m}</p>
                                                                    </div>

                                                                </div>
                                                            }
                                                        })

                                                    }
                                                </div> 
                                            </div>
                                            <Link className="px-2" to={`/item-details/${val[0]}`} style={{display:'flex',fontWeight:'bold',fontSize:'25px'}}>
                                                <h5 style={{fontWeight:'bold',fontSize:'15px',textTransform:'capitalize'}} className="mb-0">{val ? val[1] : null}</h5>
                                            </Link>
                                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <p className="px-2" style={{display:'flex',margin:'0'}}>
                                            <span>Owned By</span><span style={{textTransform:'capitalize'}} className="ml-2">{val ? val[3] : null}</span> 
                                                </p>
                                          {
                                              alldata?.map((vv)=>{
                                                  if(vv[0]===val[7]){
                                                      console.log('col',val)
                                                      return <Link to={`/col-details/${val[7]}`} className="seller d-flex align-items-center px-2" href="/item-details">
                                                        <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${vv ? vv[6] : null}`} alt="" />
                                                       
                                                        {/* <span className="ml-2">{val ? val[5] : null}</span> */}
                                                    </Link>
                                                  }
                                              })
                                          }
                                            
                                            </div>
                                            <div className="card-bottom px-2 "  style={{ display: 'flex',fontSize:'15px'}}>
                                                {/* <span>{item.price}</span>
                                                            <span>{item.count}</span> */}
                                                {


                                                    allhighp.map((u) => {

                                                        if (u.userid === val[0]) {
                                                            return allp.map((vala) => {
                                                                if (vala.id === val[0]) {
                                                                    return <>
                                                                        {
                                                                            Number(u?.val) > Number(vala?.value) ? <> <span>{Number(u?.val) / 1000000000000000000} BNB </span></> :
                                                                                <span>{Number( vala?.value / 1000000000000000000)}BNB  </span>
                                                                        }
                                                                        {/* <p>{Number(u?.val) / 1000000000000000000} BNB = $ {(Number(u?.val) / 1000000000000000000) * 487} BNB </p> */}
                                                                    </>

                                                                }
                                                            })




                                                        }
                                                    })


                                                }
                                                
                                              
                                            </div>


                                        </div>
                                        {/* <Link style={{display:'flex'}} to={`/item-details/${val[0]}`} >
                                                <button className="btn btn-bordered-white btn-smaller mt-3" ><i className="icon-handbag mr-2" />Place Bid</button>
</Link> */}
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    }):  allfixed?.slice(0,4).map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center ">
                                    <div className="image-over aucimg" >
                                        <Link to={`/item-details/${val[0]}`} >
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
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                                            <div className="countdown-times mb-3">
                                                <div className="countdown px-5"  >

                                                    {
                                                        timew.map((t) => {
                                                            if (t.id === val[0]) {
                                                                return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Days</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{t?.d} </p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Hours</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{t?.h}</p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Minutes</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{t?.m}</p>
                                                                    </div>

                                                                </div>
                                                            }
                                                        })

                                                    }
                                                </div> 
                                            </div>
                                            <Link className="px-2" to={`/item-details/${val[0]}`} style={{display:'flex',fontWeight:'bold',fontSize:'25px'}}>
                                                <h5 style={{fontWeight:'bold',fontSize:'15px',textTransform:'capitalize'}} className="mb-0">{val ? val[1] : null}</h5>
                                            </Link>
                                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <p className="px-2" style={{display:'flex',margin:'0'}}>
                                            <span>Owned By</span><span style={{textTransform:'capitalize'}} className="ml-2">{val ? val[3] : null}</span> 
                                                </p>
                                          {
                                              alldata?.map((vv)=>{
                                                  if(vv[0]===val[7]){
                                                      return <Link to={`/col-details/${val[7]}`} className="seller d-flex align-items-center px-2" href="/item-details">
                                                        <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${vv ? vv[6] : null}`} alt="" />
                                                       
                                                        {/* <span className="ml-2">{val ? val[5] : null}</span> */}
                                                    </Link>
                                                  }
                                              })
                                          }
                                            
                                            </div>
                                            <div className="card-bottom px-2 "  style={{ display: 'flex',fontSize:'15px'}}>
                                                {/* <span>{item.price}</span>
                                                            <span>{item.count}</span> */}
                                                {


                                                    allhighp.map((u) => {

                                                        if (u.userid === val[0]) {
                                                            return allp.map((vala) => {
                                                                if (vala.id === val[0]) {
                                                                    return <>
                                                                        {
                                                                            Number(u?.val) > Number(vala?.value) ? <> <span>{Number(u?.val) / 1000000000000000000} BNB </span></> :
                                                                                <span>{Number(Number(vala?.value / 1000000000000000000))}BNB  </span>
                                                                        }
                                                                        {/* <p>{Number(u?.val) / 1000000000000000000} BNB = $ {(Number(u?.val) / 1000000000000000000) * 487} BNB </p> */}
                                                                    </>

                                                                }
                                                            })




                                                        }
                                                    })


                                                }
                                                
                                              
                                            </div>


                                        </div>
                                        {/* <Link style={{display:'flex'}} to={`/item-details/${val[0]}`} >
                                                <button className="btn btn-bordered-white btn-smaller mt-3" ><i className="icon-handbag mr-2" />Place Bid</button>
</Link> */}
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                    :
                
                <div className="row items">
                    {auc==="auc"?
                    fildata?.map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center ">
                                    <div className="image-over aucimg" >
                                        <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                            <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val?.attributes?.nftImg}`} alt="" />
                                        </Link>
                                       
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                                            <div className="countdown-times mb-3">
                                                <div className="countdown px-5"  >

                                                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Days</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{val?.attributes?.days} </p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Hours</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{val?.attributes?.hr}</p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Minutes</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{val?.attributes?.min}</p>
                                                                    </div>

                                                                </div>
                                                         
                                                </div> 
                                            </div>
                                            <Link className="px-2" to={`/item-details/${val?.attributes?.nftId}`} style={{display:'flex',fontWeight:'bold',fontSize:'25px'}}>
                                                <h5 style={{fontWeight:'bold',fontSize:'15px',textTransform:'capitalize'}} className="mb-0">{val?.attributes?.nftName}</h5>
                                            </Link>
                                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <p className="px-2" style={{display:'flex',margin:'0'}}>
                                            <span>Owned By</span><span style={{textTransform:'capitalize'}} className="ml-2">{val?.attributes?.nftOwner}</span> 
                                                </p>
                                          {/* {
                                              alldata?.map((vv)=>{
                                                  if(vv[0]===val[7]){
                                                      return <Link to={`/item-details/${val[0]}`} className="seller d-flex align-items-center px-2" href="/item-details">
                                                        <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${vv ? vv[6] : null}`} alt="" />
                                                       
                                                    
                                                    </Link>
                                                  }
                                              })
                                          } */}
                                            
                                            </div>
                                            <div className="card-bottom px-2 "  style={{ display: 'flex',fontSize:'15px'}}>
                                               
                                               
                                                                            
                                                                                <span>{val?.attributes?.auction}BNB  </span>
                                                                       
                                                
                                              
                                            </div>


                                        </div>
                                        {/* <Link style={{display:'flex'}} to={{
                                                pathname: "/item-details",
                                                state: val
                                            }} >
                                                <button className="btn btn-bordered-white btn-smaller mt-3" ><i className="icon-handbag mr-2" />Place Bid</button>
</Link> */}
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    }):  fildata?.slice(0,4).map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center ">
                                    <div className="image-over aucimg" >
                                        <Link to={`/item-details/${val?.attributes?.nftId}`} >
                                            <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val?.attributes?.nftImg}`} alt="" />
                                        </Link>
                                       
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                                            <div className="countdown-times mb-3">
                                                <div className="countdown px-5"  >

                                                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Days</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{val?.attributes?.days} </p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Hours</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{val?.attributes?.hr}</p>
                                                                    </div>
                                                                    <div >
                                                                        <p style={{ margin: '0px', fontSize: '15px' }}>Minutes</p>
                                                                        <p style={{ margin: '0px', marginTop: '5px', fontWeight: 'bold' }}>{val?.attributes?.min}</p>
                                                                    </div>

                                                                </div>
                                                         
                                                </div> 
                                            </div>
                                            <Link className="px-2" to={`/item-details/${val?.attributes?.nftId}`} style={{display:'flex',fontWeight:'bold',fontSize:'25px'}}>
                                                <h5 style={{fontWeight:'bold',fontSize:'15px',textTransform:'capitalize'}} className="mb-0">{val?.attributes?.nftName}</h5>
                                            </Link>
                                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <p className="px-2" style={{display:'flex',margin:'0'}}>
                                            <span>Owned By</span><span style={{textTransform:'capitalize'}} className="ml-2">{val?.attributes?.nftOwner}</span> 
                                                </p>
                                          {/* {
                                              alldata?.map((vv)=>{
                                                  if(vv[0]===val[7]){
                                                      return <Link to={`/item-details/${val[0]}`} className="seller d-flex align-items-center px-2" href="/item-details">
                                                        <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${vv ? vv[6] : null}`} alt="" />
                                                       
                                                    
                                                    </Link>
                                                  }
                                              })
                                          } */}
                                            
                                            </div>
                                            <div className="card-bottom px-2 "  style={{ display: 'flex',fontSize:'15px'}}>
                                               
                                               
                                                                            
                                                                                <span>{val?.attributes?.auction}BNB  </span>
                                                                       
                                                
                                              
                                            </div>


                                        </div>
                                        {/* <Link style={{display:'flex'}} to={{
                                                pathname: "/item-details",
                                                state: val
                                            }} >
                                                <button className="btn btn-bordered-white btn-smaller mt-3" ><i className="icon-handbag mr-2" />Place Bid</button>
</Link> */}
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
               }
            </div>
        </section>
    );
}


export default AuctionsOne;