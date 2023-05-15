import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, ButtonToolbar, Container, Row} from "react-bootstrap";
import BoxesTable from "./BoxesTable";
import {columns} from "../../data/data";
import {boxesStore} from "../../store/BoxesStore"
import BoxCreateModal from "./BoxCreateModal";
import {observer} from "mobx-react-lite";
import {IncreaseCoastModal} from "./IncreaseCoastModal";


const Boxes = () => {
    const [showCreateBoxModal, setShowCreateBoxModal] = useState<boolean>(false);
    const [showIncreaseCoastModal, setShowIncreaseCoastModal] = useState<boolean>(false);

    useEffect(() => {
        boxesStore.loadBoxes().catch();
    }, [])

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
                <Row className="mb-5">
                    <ButtonToolbar>
                        <Button size="lg" variant="success" className="me-2" onClick={createBoxClickHandler}>Добавить бокс</Button>
                        <Button size="lg" variant="danger" className="me-2" onClick={removeBoxClickHandler}>Удалить бокс</Button>
                        <Button size="lg" variant="outline-dark" className="me-2" onClick={increaseCoastClickHandler}>Увеличить стоимость аренды</Button>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <BoxesTable columns={columns} data={boxesStore.boxesList}/>
                </Row>
            </Container>
            <BoxCreateModal show={showCreateBoxModal} closeCallback={closeCreateBoxModalHandler}/>
            <IncreaseCoastModal show={showIncreaseCoastModal} closeCallback={closeIncreaseCoastClickHandler}/>
        </>
    );
};

export default observer(Boxes);