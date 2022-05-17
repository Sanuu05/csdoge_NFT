import React from 'react'
import MyExplore from '../components/Explore/Allasset';
import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
function Mcol({acc, web3main, prov}) {
    return (
        <div className="main mt-5">
             {/* <Header /> */}
                {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
                {/* <Creates /> */}
                <MyExplore allnft={"allnft"} acc={acc}  web3main={web3main} prov={prov}/>
                {/* <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup /> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
        </div>
    )
}

export default Mcol
