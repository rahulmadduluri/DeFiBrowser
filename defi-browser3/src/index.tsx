// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
// Import DAppProvider
import { DAppProvider, ChainId} from "@usedapp/core";

const config = {
  multicallAddresses: {
    [ChainId.Localhost]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  }
}

ReactDOM.render(
  <React.StrictMode>
    {/* 
       Wrap our app in the provider, config is required, 
        but can be left as an empty object: 
    */}
    {/* <DAppProvider config={config}> */}
      <App />
    {/* </DAppProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
