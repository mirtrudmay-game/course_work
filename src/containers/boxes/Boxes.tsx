import * as React from 'react';
import {Button, ButtonToolbar, Container, Form, Modal, Nav, Row, Table} from "react-bootstrap";
import {BoxesTable} from "./BoxesTable";
import {columns} from "../../data/data";
import {store} from "../../store/Store"
import {ICreateBox, IModel} from "../../types/types";
import {useEffect, useState} from "react";
import {BoxCreateModal} from "./BoxCreateModal";
import {observer} from "mobx-react-lite";


const Boxes = () => {
    const [showCreateBoxModal, setShowCreateBoxModal] = useState<boolean>(false);

    useEffect(() => {
        store.loadAllBoxes().catch();
    }, [])

    const addBoxClickHandler = () => {
        setShowCreateBoxModal(true);
    }

    const removeBoxClickHandler = () => {

    }

    return (
        <>
            <Container>
                <Row className="mb-3">
                    <ButtonToolbar>
                        <Button className="me-2" onClick={addBoxClickHandler}>Добавить бокс</Button>
                        <Button className="me-2" onClick={removeBoxClickHandler}>Удалить бокс</Button>
                        <Button className="me-2">Предоставить бокс клиенту</Button>
                        <Button className="me-2">Удалить клиента из бокса</Button>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <BoxesTable columns={columns} data={store.boxesList}/>
                </Row>
            </Container>
            <BoxCreateModal show={showCreateBoxModal}/>
        </>
    );
};

export default observer(Boxes);