import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Button, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import {clientsTableColumns} from "../../data/data";
import {clientsStore} from "../../store/ClientsStore";
import Table from "../boxes/Table";
import {observer} from "mobx-react-lite";
import {IClient} from "../../types/types";
import ClientEditModal from "./ClientEditModal";
import ErrorModal from "./ErrorModal";

const Clients = () => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);


    const [selectedRow, setSelectedRow] = useState<IClient | null>(null);


    function openEditModal() {
        if (selectedRow) {
            setShowEditModal(true)
            return;
        }

        setShowErrorModal(true);
    }

    function closeEditModal() {
        setShowEditModal(false);
    }

    function closeErrorModal() {
        setShowErrorModal(false);
    }

    const selectRow = (id: number) => {
        setSelectedRow(clientsStore.clientsList[id]);
    };

    return (
        <>
            <Container>
                <Row className="my-4">
                    <ButtonToolbar>
                        <Button variant="outline-dark" onClick={openEditModal} className="me-2">Редактировать</Button>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <Col>
                        <Table columns={clientsTableColumns} data={clientsStore.clientsList} selectRowCallback={selectRow} onlyOneValue={true}/>
                    </Col>
                </Row>
            </Container>

            {showEditModal && selectedRow && <ClientEditModal closeCallback={closeEditModal} initialData={selectedRow} />}
            {showErrorModal && <ErrorModal closeCallback={closeErrorModal} message={"Не выбрана объект для изменения. Выберите соответствующую строку в таблице."} />}
        </>
    );
};

export default observer(Clients);