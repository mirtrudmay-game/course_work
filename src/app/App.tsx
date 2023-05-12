import {observer} from "mobx-react-lite";
import React from "react";
import {Clients} from "../containers/Clients";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Root} from "./Root";
import Boxes from "../containers/boxes/Boxes";

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} >
                        <Route index element={<Boxes/> } />
                        <Route path="clients" element={<Clients />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </React.StrictMode>
    );
};

export default observer(App);
