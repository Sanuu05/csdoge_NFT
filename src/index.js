import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";
import { DAppProvider } from "@usedapp/core";

ReactDOM.render(

  <DAppProvider config={{}}>
  <MoralisProvider appId="HYvp51mPirkIbbv1mSHS6Sdb8eiAi0M3am7EtfZ9" serverUrl="https://xhdm51ty3pgq.usemoralis.com:2053/server">
  <App />
  </MoralisProvider>
  </DAppProvider>
    ,
  document.getElementById('root')
);


