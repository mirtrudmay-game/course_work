import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import Clients from "../containers/clients/Clients";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "../components/Navigation";
import Boxes from "../containers/boxes/Boxes";
import {DeleteRent} from "./DeleteRent";
import AddRent from "./AddRent";
import {clientsStore} from "../store/ClientsStore";
import {modelsStore} from "../store/ModelsStore";
import {boxesStore} from "../store/BoxesStore";

const App = () => {
    useEffect(() => {
        clientsStore.loadAll();
        modelsStore.loadAll();
        boxesStore.loadAll();
    }, [])

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigation />} >
                        <Route path="boxes" element={<Boxes/> } />
                        <Route path="clients" element={<Clients />} />
                        <Route path="add-rent" element={<AddRent />} />
                        <Route path="delete-rent" element={<DeleteRent />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </React.StrictMode>
    );
};

export default observer(App);
