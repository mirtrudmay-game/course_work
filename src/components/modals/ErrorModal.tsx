import * as React from 'react';
import {Button, Modal} from "react-bootstrap";
import {FC} from "react";

export interface IMessageModal {
    closeCallback: () => void;
    message: string;
}

const ErrorModal: FC<IMessageModal> = ({closeCallback, message}) => {
    return (
        <Modal show onHide={closeCallback}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <p className="text-center">
                    {message}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeCallback}>ОК</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;