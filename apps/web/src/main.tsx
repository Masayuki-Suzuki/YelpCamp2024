import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import theme from './config/theme'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
)
