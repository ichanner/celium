import * as React from "react";
import Router from "./router/Router"
import * as ReactDOM from "react-dom/client";
import {Provider} from 'react-redux'
import store from "./store/index"

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>

    <Router/>

  </Provider>
  
);