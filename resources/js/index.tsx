import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./Router/Router";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./store/store";
import 'tailwindcss/tailwind.css';

const Index:React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </Provider>
    );
};

export default Index;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Index />
);
