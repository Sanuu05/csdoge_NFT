import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
// import Creates from '../components/Create/Create';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Astcreate from '../components/Create/Astcreate';

function Assetcreate ({acc, web3main, prov}) {
    
        return (
            <div className="main mt-5">
                {/* <Header /> */}
                {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
                <Astcreate acc={acc}  web3main={web3main} prov={prov} />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default Assetcreate;