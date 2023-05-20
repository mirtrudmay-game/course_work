import * as React from 'react';
import {useState} from 'react';
import {Button, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import Table from "../../components/Table/Table";
import {boxTableColumns} from "../../data/data";
import {boxesStore} from "../../store/BoxesStore"
import BoxCreateModal from "./NewBoxModal";
import {observer} from "mobx-react-lite";
import {IncreaseCoastModal} from "./IncreaseCoastModal";
import {BoxTableView} from "../../types/types";
import Register from "../../components/Test";


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
                        <Button  variant="secondary" className="me-2" onClick={increaseCoastClickHandler}>Увеличить стоимость аренды</Button>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <Col>
                        <Table<BoxTableView> columns={boxTableColumns} data={boxesStore.boxesList}/>
                    </Col>
                </Row>
            </Container>

            {showCreateBoxModal && <BoxCreateModal closeCallback={closeCreateBoxModalHandler}/>}
            {showIncreaseCoastModal && <IncreaseCoastModal closeCallback={closeIncreaseCoastClickHandler}/>}

            {/*{successMessage && <SuccessModal message={successMessage}/>}
            {boxesStore.errorMessage && <ErrorModal closeCallback={() => boxesStore.clearError()} message={boxesStore.errorMessage}/>}*/}
        </>
    );
};

export default observer(Boxes);