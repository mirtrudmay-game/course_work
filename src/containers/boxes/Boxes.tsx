import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import Table from "./Table";
import {boxTableColumns} from "../../data/data";
import {boxesStore} from "../../store/BoxesStore"
import BoxCreateModal from "./BoxCreateModal";
import {observer} from "mobx-react-lite";
import {IncreaseCoastModal} from "./IncreaseCoastModal";


const Boxes = () => {
    const [showCreateBoxModal, setShowCreateBoxModal] = useState<boolean>(false);
    const [showIncreaseCoastModal, setShowIncreaseCoastModal] = useState<boolean>(false);

    const createBoxClickHandler = () => {
        setShowCreateBoxModal(true);
    }

    const closeCreateBoxModalHandler = () => {
        setShowCreateBoxModal(false)
    }

    const removeBoxClickHandler = () => {

    }

    const increaseCoastClickHandler = () => {
        setShowIncreaseCoastModal(true);
    }

    const closeIncreaseCoastClickHandler = () => {
        setShowIncreaseCoastModal(false);
    }

    return (
        <>
            <Container>
                <Row className="my-4">
                    <ButtonToolbar>
                        <Button  variant="success" className="me-2" onClick={createBoxClickHandler}>Добавить бокс</Button>
                        <Button  variant="danger" className="me-2" onClick={removeBoxClickHandler}>Удалить бокс</Button>
                        <Button  variant="outline-dark" className="me-2" onClick={increaseCoastClickHandler}>Увеличить стоимость аренды</Button>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <Col>
                        <Table columns={boxTableColumns} data={boxesStore.boxesList}/>
                    </Col>
                </Row>
            </Container>
            <BoxCreateModal show={showCreateBoxModal} closeCallback={closeCreateBoxModalHandler}/>
            <IncreaseCoastModal show={showIncreaseCoastModal} closeCallback={closeIncreaseCoastClickHandler}/>
        </>
    );
};

export default observer(Boxes);