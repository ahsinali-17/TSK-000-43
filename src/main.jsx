import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store,persistor } from './redux-toolkit/Store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { FirebaseProvider } from './firebase/Firebase'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <FirebaseProvider>
    <App />
    </FirebaseProvider>
    </PersistGate>
    </Provider>
)
