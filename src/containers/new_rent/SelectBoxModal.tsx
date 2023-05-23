import {useStores} from "../../store/RootStore";
import * as React from "react";
import {FC, useEffect} from "react";
import {IBoxResponse} from "../../types/types";
import {Button, Modal} from "react-bootstrap";
import Table from "../../components/Table/Table";
import {boxTableColumns} from "../../data/data";
import {observer} from "mobx-react-lite";

interface ISelectBoxModal {
    id: string;
    closeCallback: () => void;
    show: boolean;
    submitCallback: (id: number) => void;
}

const SelectBoxModal: FC<ISelectBoxModal> = ({ id, closeCallback, show, submitCallback }) => {
    const { freeBoxesStore } = useStores();

    useEffect(() => {
        if (show) {
            freeBoxesStore.loadFreeByModelId(id);
        }
    }, [show]);

    const selectRowHandler = (index: number) => {
        freeBoxesStore.setSelectedBox(index);
    };

    return (
        <Modal size={"xl"} show={show} onHide={closeCallback}>
            <Modal.Header closeButton>
                <h5>Выбор бокса</h5>
            </Modal.Header>
            <Modal.Body>
                <Table<IBoxResponse>
                    columns={boxTableColumns}
                    data={freeBoxesStore.freeBoxesList}
                    selectRowCallback={selectRowHandler}
                    onlyOneValue={true}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} className={"px-3"} onClick={closeCallback}>
                    Отменить
                </Button>
                <Button
                    variant={"warning"}
                    className={"px-4"}
                    disabled={!freeBoxesStore.selectedBoxId}
                    onClick={() => submitCallback(freeBoxesStore.selectedBoxId!)}
                >
                    Выбрать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(SelectBoxModal);
