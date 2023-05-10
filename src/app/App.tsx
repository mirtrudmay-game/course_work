import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import {Boxes} from "../components/Boxes";


const App = () => {
    return (
        <>
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav.Item>
                    <Nav.Link eventKey="home">Главная</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="new">Новое бронирование</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="boxes">Боксы</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="clients">Клиенты</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="models">Модели</Nav.Link>
                </Nav.Item>
            </Nav>
            <Container>
                <Boxes></Boxes>
            </Container>
        </>

    );
};

export default observer(App);
