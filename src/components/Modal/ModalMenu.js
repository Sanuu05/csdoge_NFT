import React from 'react';

const ModalMenu = () => {
    return (
        <div id="menu" className="modal fade p-0">
            <div className="modal-dialog dialog-animated">
                <div className="modal-content h-100">
                    <div className="modal-header" data-dismiss="modal">
                        Menu <i className="far fa-times-circle icon-close" />
                    </div>
                    <div className="menu modal-body">
                        <div className="row w-100">
                            {/* <div className="items p-0 col-12 text-center" /> */}
                            <ul className="navbar-nav items mx-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="/explore-1">Explore</a>
                                </li>

                                <li className="nav-item">
                                    <a href="/create" className="nav-link">Create</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/mycollection" className="nav-link">My Collections</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/csdoge" className="nav-link">CS DOGE</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMenu;