import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

function AuthorProfile (props) {
    const [social,setsocial] = useState([])
    useEffect(()=>{
        axios.get(`${BASE_URL}`)
            .then(res => {
                // this.setState({
                //     data: res.data,
                //     socialData: res.data.socialData
                // })
                setsocial(res.data.socialData)
                
            })
        .catch(err => console.log(err))
    },[])
    console.log(social)
    
        return (
            <div className="card no-hover text-center">
                <div className="image-over">
                    <div className="card-img-top" style={{height:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img  src={props.sendpic?props.sendpic:'https://gingermats.co.uk/wp-content/uploads/2013/10/600x6001.gif'} className="selectimg" alt="" />
                    {/* Author */}
                    </div>
                    <div className="author">
                        <div className="author-thumb avatar-lg">
                            <img className="rounded-circle" src={props.sendpic?props.sendpic:'https://gingermats.co.uk/wp-content/uploads/2013/10/600x6001.gif'} alt="" />
                        </div>
                    </div>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                <div className="card-body mt-4">
                {/* <h5 className="mb-3">Artnox</h5> */}
                        {/* <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
                    {/* Card Body */}
                    {/* <div className="social-icons d-flex justify-content-center my-3">
                            {social.map((item, idx) => {
                                return (
                                    <a key={`asd_${idx}`} className={item.link} href="#">
                                        <i className={item.icon} />
                                        <i className={item.icon} />
                                    </a>
                                );
                            })}
                        </div> */}
                </div>
                </div>
                
            </div>
        );
    }


export default AuthorProfile;