import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, ButtonToolbar, Col, Container, Dropdown, Row} from "react-bootstrap";
import {clientsTableColumns} from "../../data/data";
import Table from "../../components/Table/Table";
import {observer} from "mobx-react-lite";
import {IRenter} from "../../types/types";
import ClientEditModal from "./ClientEditModal";
import {Tooltip} from "../../components/Tooltip";
import {useStores} from "../../store/RootStore";

const Clients = () => {
    const { clientsStore } = useStores();
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    useEffect(() => {
        clientsStore.loadAll();
    }, [])

    function closeEditModal() {
        setShowEditModal(false);
    }

    function openEditModal() {
        setShowEditModal(true);
    }

    const selectRow = (indexes: Record<string, boolean>) => {
        clientsStore.setSelectedClient(indexes);
    };

    return (
        <>
            <Container>
                <ButtonToolbar className="my-4">
                    <Tooltip text="Редактировать данные выбранного клиента" >
                        <Button variant="outline-dark" className="me-2" disabled={!clientsStore.selectedClient} onClick={openEditModal}>
                            <i className="bi-pen"></i></Button>
                    </Tooltip>

                    <Dropdown>
                        <Tooltip text="Получить справку">
                            <Dropdown.Toggle variant="outline-dark" className="me-2">
                                <i className="bi bi-filetype-xls"></i>
                            </Dropdown.Toggle>
                        </Tooltip>


                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">О всех клиентах</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">О клиентах по марке автомобиля</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" disabled={!clientsStore.selectedClient}>О выбранном
                                клиенте</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ButtonToolbar>

                <Row>
                    <Col>
                        <Table<IRenter> columns={clientsTableColumns} data={clientsStore.clientsList}
                                        selectRowCallback={selectRow} onlyOneValue={true}/>
                    </Col>
                </Row>
            </Container>

            {clientsStore.selectedClient && showEditModal &&
                <ClientEditModal show={showEditModal} closeCallback={closeEditModal}
                                 initialData={clientsStore.selectedClient}/>}
        </>
    );
};

export default observer(Clients);