import {useStores} from "../../store/RootStore";
import * as React from "react";
import {FC, useEffect} from "react";
import {IBoxResponse} from "../../types/types";
import {Button, Modal} from "react-bootstrap";
import Table from "../../components/Table/Table";
import {boxTableColumns} from "../../data/data";

interface ISelectBoxModal {
    id: string;
    closeCallback: () => void;
    show: boolean;
    submitCallback: () => void;
}

export const SelectBoxModal:FC<ISelectBoxModal> = ({id, closeCallback, show, submitCallback}) => {
    const { freeBoxesStore } = useStores();

    useEffect(() => {
        if (show) freeBoxesStore.loadFreeByModelId(id);
    }, [show])


    const selectRowHandler = (indexes: Record<string, boolean>) => {
        freeBoxesStore.setSelectedBox(indexes);
    }

    return (
        <Modal size={"xl"} show={show} onHide={closeCallback}>
            <Modal.Header closeButton>Выбор бокса</Modal.Header>
            <Modal.Body>
                <Table<IBoxResponse> columns={boxTableColumns} data={freeBoxesStore.freeBoxesList}
                                     selectRowCallback={selectRowHandler} onlyOneValue={true}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submitCallback}></Button>
            </Modal.Footer>

        </Modal>
    )
}