import * as React from 'react';
import {useEffect} from 'react';
import {Button, ButtonToolbar, Container, Row} from "react-bootstrap";
import {columns} from "../../data/data";
import {clientsStore} from "../../store/ClientsStore";
import {ClientsTable} from "./ClientsTable";

type Props = {

};

export function Clients(props: Props) {
    useEffect(() => {
        clientsStore.loadAll();
    })

    return (
        <>
            <Container>
                <Row className="mb-3">
                    <ButtonToolbar>
                        <Button className="me-2">Изменить данные о клиенте</Button>
                    </ButtonToolbar>
                </Row>
                <Row>
                    <ClientsTable columns={columns} data={clientsStore.clientsList}/>
                </Row>
            </Container>
        </>
    );
};