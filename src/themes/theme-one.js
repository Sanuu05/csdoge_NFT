import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Hero from '../components/Hero/Hero';
import Auctions from '../components/Auctions/AuctionsOne';
// import TopSeller from '../components/TopSeller/TopSellerOne';
import Collections from '../components/Collections/Collections';
import Explore from '../components/Explore/ExploreOne';
// import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Explore1 from '../components/Explore/Allasset';

function ThemeOne ({acc,  web3main,prov}) {
    console.log('theme',acc)

        return (
            <div className="main mt-5">
                {/* <Header /> */}
                {/* <Hero /> */}
                <Auctions allauc={"allauc"} acc={acc}  web3main={web3main} prov={prov} />
                {/* <TopSeller /> */}
                <Collections acc={acc} web3main={web3main} prov={prov}/>
                <Explore acc={acc}  web3main={web3main} prov={prov}/>
                <Explore1 acc={acc}  web3main={web3main} prov={prov}/>
                {/* <Work /> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }


export default ThemeOne;