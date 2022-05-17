import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ExploreOne';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

function ExploreOne ({acc, web3main,prov}) {
        return (
            <div className="main mt-5">
                {/* <Header /> */}
                
                <Breadcrumb title="SALE" subpage="sale" page="SALE" />
                
                <Explore sale={"sale"} acc={acc}  web3main={web3main} prov={prov}/>
                
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default ExploreOne;