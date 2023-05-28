import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

export type WelcomePageProps = {};
export const WelcomePage: React.FC<WelcomePageProps> = ({}) => {
    const [subtitle, setSubtitle] = useState("");
    const text = "Добро пожаловать!";
    let currentIndex = 0;

    /*useEffect(() => {
        if (currentIndex < text.length - 1) {
            setInterval(() => {
                setSubtitle((prev) => prev + text[currentIndex]);
                currentIndex += 1;
            }, 100);
        }
    }, []);*/

    return (
        <Container fluid>
            <Row></Row>
            <Row>
                <Col className={"text-center"} style={{ backgroundColor: "#ffc107" }}>
                    <h1>{subtitle}</h1>
                </Col>
            </Row>
            <Row></Row>
        </Container>
    );
};
