import {Link, Outlet} from "react-router-dom";
import {Nav} from "react-bootstrap";

export const Root = () => {
    return (
        <>
            <Nav defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                    <Nav.Link as={Link} to="/clients">Клиенты</Nav.Link>
                </Nav.Item>
            </Nav>
            <Outlet/>
        </>
    )
};
