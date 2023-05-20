import { makeAutoObservable } from "mobx";
import {IOption} from "../types/types";

interface ICreateBox {
    boxNumber: string;
    model: IOption;
    dailyCoast: string;
}

interface ICreateBoxError {
    boxNumber: string;
    model: string;
    dailyCoast: string;
}

interface ICreateBoxStore {
    box: ICreateBox;
    error: ICreateBoxError;
}

const initialBox = {
    boxNumber: '',
    model:
}

class CreateBoxStore implements ICreateBoxStore {
    box: ICreateBox = {};
    error: ICreateBoxError = {};

    constructor() {
        makeAutoObservable(this);
    }


}

export const boxesStore = new CreateBoxStore();
