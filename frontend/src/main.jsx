import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Loader from './components/loader.jsx'
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import store from "./store";
const persistedStore = persistStore(store);
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </>,
)
