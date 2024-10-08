import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { Provider } from 'react-redux';
import configureStore from './store/store.js';;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={configureStore}></Provider>
    <App />
  </React.StrictMode>,
)
