// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

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
