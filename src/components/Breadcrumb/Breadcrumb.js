import React, { Component } from 'react';

class Breadcrumb extends Component {
    render() {
        return (
            <section style={{padding:'100px 0 0 0'}} className=" d-flex ">
                <div className="container">
                   
                        <div className="col-12 mt-5" style={{display:'flex'}}>
                            <a style={{width:'50%',display:'flex',justifyContent:'center'}} href="/explore-1">
                            <button className={this.props.subpage==="sale"?"activesale":""}  style={{width:'50%',border:'none',outline:'none',color:'white',fontSize:'20px',background:'none'}}>Sale</button>
                            </a>
                            <a style={{width:'50%',display:'flex',justifyContent:'center'}} href="/auctions">
                            <button className={this.props.subpage==="auction"?"activesale":""}  style={{width:'50%',border:'none',outline:'none',color:'white',fonSize:'22px',background:'none'}}>Auction</button>
                            </a>
                         
                        </div>
            
                </div>
            </section>
        );
    }
}

export default Breadcrumb;