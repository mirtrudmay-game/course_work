import * as React from 'react';
import {Button, ButtonToolbar, Container, Nav, Row, Table} from "react-bootstrap";
import {BoxesTable} from "./BoxesTable";

export function Boxes() {
    return (
        <>
            <Container>
                <Row>
                    <ButtonToolbar>
                        <Button className="me-1">Добавить бокс</Button>
                        <Button>Удалить выбранный бокс</Button>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <BoxesTable/>
                </Row>
            </Container>
        </>
    );
};