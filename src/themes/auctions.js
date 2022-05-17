import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import LiveAuctions from '../components/Auctions/AuctionsOne';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

function Auctions ({acc, web3main, prov}) {
 
        return (
            <div className="main mt-5">
                {/* <Header /> */}
                <Breadcrumb title="Auctions" subpage="auction" page="Live Auctions" />
                <LiveAuctions auc={"auc"} acc={acc}  web3main={web3main} prov={prov} />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }

export default Auctions;