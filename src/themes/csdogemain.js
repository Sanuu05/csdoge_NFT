import React from 'react'
import MyExplore from '../components/Explore/Csdoge';
import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
function Csdogemain({acc ,  web3main, prov}) {
    console.log('csdohemain',acc)
    return (
        <div className="main">
             {/* <Header /> */}
                {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
                {/* <Creates /> */}
                <MyExplore acc={acc}  web3main={web3main} prov={prov}/>
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

export default Csdogemain
