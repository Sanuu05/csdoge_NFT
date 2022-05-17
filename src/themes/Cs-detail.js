import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
// import ItemDetail from '../components/ItemDetails/ItemDetails';
// import LiveAuctions from '../components/Auctions/AuctionsThree';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
// import Colmaindetail from '../components/ItemDetails/Coldetail';
// import ExploreFive from '../components/Explore/ExploreTwo';
import Csdetail from '../components/ItemDetails/Csdetail';
 function Coldetails({acc, web3main, prov}) {
    
        return (
            <div className="main mt-5">
                {/* <Header /> */}
                {/* <Breadcrumb title="Collection Details" subpage="Explore" page="Collection Details" /> */}
                {/* <ItemDetail /> */}
                {/* <LiveAuctions /> */}
                <Csdetail acc={acc}  web3main={web3main} prov={prov}/>
                {/* <ExploreFive/> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default Coldetails;