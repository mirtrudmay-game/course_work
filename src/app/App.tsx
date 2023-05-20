import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import Clients from "../containers/clients/Clients";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "../components/Navigation";
import Boxes from "../containers/boxes/Boxes";
import {clientsStore} from "../store/ClientsStore";
import {modelsStore} from "../store/ModelsStore";
import {boxesStore} from "../store/BoxesStore";
import {NewRent} from "../containers/new_rent/NewRent";

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
                        <Route path="add-rent" element={<NewRent />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </React.StrictMode>
    );
};

export default observer(App);
