import * as React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

type Props = {};

export function Navigation(props: Props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Твой гараж</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/">Боксы</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/clients">Клиенты</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/models">Модели</Nav.Link>
                    </Nav.Item>
                    {/*<NavLink to={`/`}>Боксы</NavLink>
                    <NavLink to={`/clients`}>Клиенты</NavLink>
                    <NavLink to={`/models`}>Модели</NavLink>
                    <NavLink to={`/documents`}>Документы</NavLink>*/}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

/*    return (
        <>
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
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
        </>
    );*/
};