import {Modal} from "react-bootstrap";
import {boxesStore} from "../../store/BoxesStore";

export function ReferencesModal(props: { closeCallback: any, show: boolean }) {
    return <Modal show={props.show}>
        <Modal.Header closeButton>
            Получение справок
        </Modal.Header>
        <Modal.Body>
            <p><a href="#/action-1"><i className="bi-download me-3"></i>О пустых боксах</a></p>
            <p><a href="#/action-3"><i className="bi-download me-3"></i>О всех моделях машин</a></p>
            <a href="#/action-2">
                <i className="bi-download me-3"></i>
                О клиенте, занимающем выбранный бокс</a>
        </Modal.Body>
    </Modal>;
}