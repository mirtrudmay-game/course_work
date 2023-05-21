import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, ButtonToolbar, Col, Container, Dropdown, Row} from "react-bootstrap";
import Table from "../../components/Table/Table";
import {boxTableColumns} from "../../data/data";
import {boxesStore} from "../../store/BoxesStore"
import BoxCreateModal from "./NewBoxModal";
import {observer} from "mobx-react-lite";
import {IncreaseCoastModal} from "./IncreaseCoastModal";
import {createTableViewBoxData, ITableViewBox} from "../../types/types";
import ErrorModal from "../../components/modals/ErrorModal";
import SuccessModal from "../../components/modals/SuccessModal";
import {Tooltip} from "../../components/Tooltip";

const Boxes = () => {
    const [showCreateBoxModal, setShowCreateBoxModal] = useState<boolean>(false);
    const [showIncreaseCoastModal, setShowIncreaseCoastModal] = useState<boolean>(false);

    useEffect(() => {
        boxesStore.loadAll();
    }, [])

    const createBoxClickHandler = () => {
        setShowCreateBoxModal(true);
    }

    const closeCreateBoxModalHandler = () => {
        setShowCreateBoxModal(false)
    }

    const removeBoxClickHandler = () => {
        boxesStore.deleteSelectedBox();
    }

    const selectRowHandler = (indexes: Record<string, boolean>) => {
        boxesStore.setSelectedBoxes(indexes);
    }

    const increaseCostClickHandler = () => {
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
                        <Tooltip text="Добавить бокс">
                            <Button variant="success" className="me-2" onClick={createBoxClickHandler}><i
                                className="bi-plus-lg"></i></Button>
                        </Tooltip>
                        <Tooltip text="Удалить выбранный бокс">
                            <Button variant="danger" disabled={!boxesStore.haveSelected} data-bs-toggle="tooltip"
                                    data-bs-html="true" title="<em>Подсказка</em>" className="me-2"
                                    onClick={removeBoxClickHandler}><i className="bi-trash"/></Button>
                        </Tooltip>
                        <Tooltip text="Увеличить стоимость аренды всех боксов">
                            <Button variant="outline-dark" className="me-2" onClick={increaseCostClickHandler}><i
                                className="bi-pen"/></Button>
                        </Tooltip>


                        <Dropdown>
                            <Tooltip text="Получить справку">
                                <Dropdown.Toggle variant="outline-dark" className="me-2">
                                    <i className="bi bi-filetype-xls"></i>
                                </Dropdown.Toggle>
                            </Tooltip>

                            <Dropdown.Menu className={"mt-1"}>
                                <Dropdown.Item href="#/action-1"><span className="py-2 px-2"><i
                                    className="bi-download me-3"></i>О пустых боксах</span></Dropdown.Item>
                                <Dropdown.Item href="#/action-3"><span className="py-2 px-2"><i
                                    className="bi-download me-3"></i>О всех моделях
                                    машин</span></Dropdown.Item>
                                <Dropdown.Item href="#/action-2" disabled={!boxesStore.haveSelected}>
                                    <span className="py-2 px-2"><i className="bi-download me-3"></i>
                                        О клиенте, занимающем выбранный бокс</span></Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <Col>
                        <Table<ITableViewBox> selectRowCallback={selectRowHandler} columns={boxTableColumns}
                                              data={boxesStore.boxesList.map(box => createTableViewBoxData(box))}/>
                    </Col>
                </Row>
            </Container>

            {<BoxCreateModal show={showCreateBoxModal} closeCallback={closeCreateBoxModalHandler}/>}
            {<IncreaseCoastModal show={showIncreaseCoastModal} closeCallback={closeIncreaseCoastClickHandler}/>}

            {<SuccessModal show={!!boxesStore.successMessage} closeCallback={() => boxesStore.clearSuccessMessage()}
                           message={boxesStore.successMessage}/>}
            {<ErrorModal show={!!boxesStore.errorMessage} closeCallback={() => boxesStore.clearErrorMessage()}
                         message={boxesStore.errorMessage}/>}
        </>
    );
};

export default observer(Boxes);