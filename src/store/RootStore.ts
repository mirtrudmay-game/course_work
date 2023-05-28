import {BoxesStore} from "./BoxesStore";
import {ModelsStore} from "./ModelsStore";
import {createContext, useContext} from "react";
import {ClientsStore} from "./ClientsStore";
import {FreeBoxesStore} from "./FreeBoxesStore";
import {CarsStore} from "./CarsStore";
import {FilesStore} from "./FilesStore";
import {NewCarStore} from "./NewCarStore";
import {ChartStore} from "./ChartStore";

export class RootStore {
    boxesStore: BoxesStore;
    modelsStore: ModelsStore;
    clientsStore: ClientsStore;
    freeBoxesStore: FreeBoxesStore;
    carsStore: CarsStore;
    newCarStore: NewCarStore;
    filesStore: FilesStore;
    chartStore: ChartStore;

    constructor() {
        this.boxesStore = new BoxesStore(this);
        this.modelsStore = new ModelsStore(this);
        this.clientsStore = new ClientsStore(this);
        this.freeBoxesStore = new FreeBoxesStore(this);
        this.carsStore = new CarsStore(this);
        this.newCarStore = new NewCarStore(this);
        this.filesStore = new FilesStore(this);
        this.chartStore = new ChartStore(this);
    }
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);
