import {BoxesStore} from "./BoxesStore";
import {ModelsStore} from "./ModelsStore";
import {createContext, useContext} from "react";
import {ClientsStore} from "./ClientsStore";
import {FreeBoxesStore} from "./FreeBoxesStore";

export class RootStore {
    boxesStore: BoxesStore;
    modelsStore: ModelsStore;
    clientsStore: ClientsStore;
    freeBoxesStore: FreeBoxesStore;

    constructor() {
        this.boxesStore = new BoxesStore(this)
        this.modelsStore = new ModelsStore(this)
        this.clientsStore = new ClientsStore(this)
        this.freeBoxesStore = new FreeBoxesStore(this)
    }
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);