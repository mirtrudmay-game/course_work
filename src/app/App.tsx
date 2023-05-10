import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Filter } from "../components/Filter";
import EventsList from "../components/GroupsList";
import { eventsStore } from "../store/EventsStore";
import CreateEventModal from "../components/CreateEventModal";
import CreateInviteModal from "../components/CreateInviteModal";

const App = () => {
    useEffect(() => {
        eventsStore.loadAllEvents().then(console.error);
    }, []);

    const [isEventModalVisible, setEventModalVisible] = useState<boolean>(false);
    const [isInviteModalVisible, setInviteModalVisible] = useState<boolean>(false);

    const onCreateEventClickHandle = () => {
        setEventModalVisible(true);
    };

    const onInviteEventClickHandle = () => {
        setInviteModalVisible(true);
    };

    function onHideCreateEventModal() {
        setEventModalVisible(false);
    }

    function onHideCreateInvitationModal() {
        setInviteModalVisible(false);
    }

    return (
        <Container className="p-3">
            <Row className="mb-2">
                <Col xs={2}>
                    <Button className={"w-100"} onClick={onCreateEventClickHandle}>
                        Создать встречу
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Button className={"w-100"} onClick={onInviteEventClickHandle}>
                        Создать приглашение
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <EventsList data={eventsStore.groupsList} />
                </Col>
                <Col>
                    <Filter />
                </Col>
            </Row>
            <CreateEventModal isShow={isEventModalVisible} onHide={onHideCreateEventModal} />
            <CreateInviteModal isShow={isInviteModalVisible} onHide={onHideCreateInvitationModal} />
        </Container>
    );
};

export default observer(App);
