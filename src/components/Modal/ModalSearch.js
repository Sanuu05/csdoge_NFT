import React, {  useState } from 'react';
// import { Link } from 'react-router-dom';



function ModalSearch () {
    const [search,setsearch] = useState()
   
        return (
            <div id="search" className="modal fade p-0">
                <div className="modal-dialog dialog-animated">
                    <div className="modal-content h-100">
                        <div className="modal-header" data-dismiss="modal">
                            Search <i className="far fa-times-circle icon-close" />
                        </div>
                        <div className="modal-body">
                            <form className="row">
                                <div className="col-12 align-self-center">
                                    <div className="row">
                                        <div className="col-12 pb-3">
                                            <h2 className="search-title mt-0 mb-3">What are you looking for?</h2>
                                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 input-group mt-4">
                                            <input type="text" placeholder="Enter your keywords" onChange={(e)=>setsearch(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 input-group align-self-center">
                                            <a href={`/search/${search}`} className="btn btn-bordered-white mt-3">Search</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    
}

export default ModalSearch;