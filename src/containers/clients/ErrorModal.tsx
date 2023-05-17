import * as React from 'react';
import {Modal} from "react-bootstrap";
import {FC} from "react";

interface IErrorModal {
    closeCallback: () => void;
    message: string;
}

const ErrorModal: FC<IErrorModal> = ({closeCallback, message}) => {
    return (
        <Modal show onHide={closeCallback}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <p className="text-center">
                    {message}
                </p>
            </Modal.Body>

        </Modal>
    );
};

export default ErrorModal;