import './_app.css';
import React from 'react';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import Menu from '../components/Navbar/Menu';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
    return (<>
        <Head>
            <title>Sound Store</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Provider store={store}>
            <Menu /> {/* [todo] rename to PopoutMenu? */}
            <Navbar />
                <main>
                    <Component {...pageProps} />
                </main>
            <Footer />
        </Provider>
    </>);
};