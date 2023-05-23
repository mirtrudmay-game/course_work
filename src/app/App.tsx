import {observer} from "mobx-react-lite";
import React from "react";
import Clients from "../containers/clients/Clients";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "../components/Navigation";
import Boxes from "../containers/boxes/Boxes";
import NewRent from "../containers/new_rent/NewRent";
import Cars from "../containers/cars/Cars";

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigation />}>
                        <Route path="boxes" element={<Boxes />} />
                        <Route path="clients" element={<Clients />} />
                        <Route path="cars" element={<Cars />} />
                        <Route path="new-rent" element={<NewRent />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default observer(App);
