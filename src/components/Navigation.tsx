import {Link, Outlet} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import car from "../../assets/car.png";

export const Navigation = () => {
    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>
                        <img alt={"logo"} src={car} height={50} className="me-3" />
                        <span className="text-uppercase fw-semibold">твой гараж</span>
                    </Navbar.Brand>

                    <Nav variant="pills" defaultActiveKey="/boxes">
                        <Nav.Item as="li" className="fw-semibold">
                            <Nav.Link eventKey={"link-1"} as={Link} to="/boxes">
                                Боксы
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="fw-semibold">
                            <Nav.Link eventKey={"link-2"} as={Link} to="/clients">
                                Клиенты
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="fw-semibold">
                            <Nav.Link eventKey={"link-3"} as={Link} to="/cars">
                                Автомобили
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="fw-semibold">
                            <Nav.Link eventKey={"link-4"} as={Link} to="/new-rent">
                                Новое бронирование
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
};
