import EventsList from "../components/GroupsList";
import { eventsStore } from "../store/EventsStore";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

function AllEvents() {
    useEffect(() => {
        eventsStore.loadAllEvents().catch(console.error);
    }, []);

    return (
        <>
            <h3 className="text-center" style={{ marginBottom: "20px" }}>
                Все события
            </h3>
            <EventsList data={eventsStore.groupsList} />
        </>
    );
}

export default observer(AllEvents);
