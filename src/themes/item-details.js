import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ItemDetail from '../components/ItemDetails/ItemDetails';
// import LiveAuctions from '../components/Auctions/AuctionsThree';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

function ItemDetails ({acc,web3main,prov}){ 
        return (
            <div className="main mt-5" style={{minHeight:'60vh'}}>
                {/* <Header /> */}
                {/* <Breadcrumb title="Item Details" subpage="Explore" page="Item Details" /> */}
                <ItemDetail acc={acc} web3main={web3main} prov={prov} />
                {/* <LiveAuctions /> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default ItemDetails;