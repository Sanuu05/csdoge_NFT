import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
import ExploreTwo from "../themes/explore-two";
// import ExploreThree from "../themes/explore-three";
// import ExploreFour from "../themes/explore-four";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
import { Modal, Button } from 'react-bootstrap'
import Create from "../themes/create";
// import Login from "../themes/login";
// import Signup from "../themes/signup";
// import Contact from "../themes/contact";
// import MyExplore from "../components/Explore/MyExplore";
import Mcol from "../themes/Mcol";
import Coldetails from "../themes/Col-detail";
import Csdetails from "../themes/Cs-detail";
import Assetcreate from "../themes/assetcreate";
import Csdogemain from "../themes/csdogemain";
import Createcsdoge from "../themes/createcs";
import Allcol from "../themes/allcol";
import Allast from "../themes/Allast";
// import Csdetail from "../components/ItemDetails/Csdetail";
import ScrollToTop from "../ScrollToTop";
import Msearch from "../themes/mysearch";
import Header from "../components/Header/Header";


function MyRouts() {
  const [accountid, setaccountid] = useState()
  const [accountid1, setaccountid1] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [chainid, setchainid] = useState()
  const [acc, setacc] = useState(false)
  const [web3main, setweb3main] = useState()
  const [prov,setprov] = useState()
  const change = ((v) => {

    setacc(v)
  })
  const provider1=((v)=>{
    setprov(v)
  })
  const web3m = ((v) => {
    setweb3main(v)

  })
  console.log('acuccc', acc)
  // const onc = () => {
  //   settheme(!theme)
  // }
  // console.log('fffff', theme)

  // const history = useHistory()
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (acc) {
  //       const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       setaccountid(accounts1[0])
  //     }
  //     // console.log(accounts1)
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(async () => {
  //   if (acc) {

  //     const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     setaccountid1(accounts1[0])

  //   }



  // }, [acc]);
  useEffect(() => {
    if (accountid != accountid1) {
      window.location.reload()
      // history.push('/')
    }

  }, [accountid])
  useEffect(async () => {
    if (acc && prov) {

      const chainId = await prov.request({ method: 'eth_chainId' });
      console.log('chain', chainid)

      setchainid(chainId)

      const accountsa = await prov.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
      });
      console.log("switch", accountsa)
      await prov.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    }


  }, [acc,prov]);
  useEffect(() => {
    if (chainid && acc) {
      console.log('ckli', chainid)
      chainid == 0x38 ? setShow(false) : setShow(true)
    }

  }, [accountid1, chainid, acc])
  useEffect(async () => {
    if (acc && web3main) {
      // const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // setaccountid(accounts1)
      if (window.ethereum) {
        async function getAccount() {
          const accounts = await window.ethereum.enable();
          const account = accounts[0];
          // do something with new account here
          // alert('accont changed')
          // alert('hello')
          // history.push('/')
          // window.location.reload()
        }


        window.ethereum.on('accountsChanged', function (accounts) {
          console.log("account", accounts)
          getAccount();
        })
      }
    }
  }, [])


  return (
    <div>
      <Router>
        <ScrollToTop />
        <Header change={change} web3m={web3m} provider1={provider1} />
        <Switch>

          <Route exact path="/" >
            <ThemeOne acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/auctions" >
            <Auctions acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/col-details/:colid" >
            <Coldetails acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/explore-1" >
            <ExploreOne acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/explore-2" >
            <ExploreTwo acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/item-details/:nftid" >
            <ItemDetails acc={acc} web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/cs-details/:csid" >
            <Csdetails acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/create" >
            <Create acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/assetcreate/:colid" >
            <Assetcreate acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/mycollection" >
            <Mcol acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/search/:word" >
            <Msearch acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/csdoge" >
            <Csdogemain acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/createcsdoge" >
            <Createcsdoge acc={acc}  web3main={web3main} prov={prov} />
          </Route>
          <Route exact path="/allcol" >
            <Allcol acc={acc} web3main={web3main} prov={prov}/>
          </Route>
          <Route exact path="/allnft" >
            <Allast acc={acc}  web3main={web3main} prov={prov}/>
          </Route>
          {/* <Route exact path="/explore-1" component={ExploreOne} acc={acc}/> */}
          {/* <Route exact path="/explore-2" component={ExploreTwo} acc={acc}/> */}
          {/* <Route exact path="/auctions" component={Auctions} /> */}
          {/* <Route exact path="/item-details/:nftid" component={ItemDetails} acc={acc}/> */}
          {/* <Route exact path="/col-details/:colid" component={Coldetails} acc={acc}/> */}
          {/* <Route exact path="/cs-details" component={Csdetails} acc={acc}/> */}
          {/* <Route exact path="/create" component={Create} acc={acc}/> */}
          {/* <Route exact path="/assetcreate/:colid" component={Assetcreate} acc={acc}/> */}
          {/* <Route exact path="/mycollection" component={Mcol} acc={acc} /> */}
          {/* <Route exact path="/search/:word" component={Msearch} acc={acc}/> */}
          {/* <Route exact path="/csdoge" component={Csdogemain} /> */}
          {/* <Route exact path="/createcsdoge" component={Createcsdoge} acc={acc}/> */}
          {/* <Route exact path="/allcol" component={Allcol} acc={acc}/> */}
          {/* <Route exact path="/allnft" component={Allast} acc={acc}/> */}

        </Switch>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >

          <Modal.Body>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h5>Switch Wallet to BSC Mainnet</h5>

            </div>

          </Modal.Body>
        </Modal>
      </Router>
    </div>
  );
}

export default MyRouts;