import {ErrorMessage, Field, Formik} from 'formik';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import InputNumberField from "./InputNumberField";



const Register = () => (
    <Formik
        initialValues={{
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password2: ''
        }}
        validate={values => {
            const errors = {};
            if (!values.username) {
                errors.username = 'Username is required';
            }
            if (!values.first_name) {
                errors.first_name = 'First Name is required';
            } else if (values.first_name.length > 15) {
                errors.first_name = 'Must be 15 characters or less';
            }
            if (!values.last_name) {
                errors.last_name = 'Last Name is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }
            if (!values.password2) {
                errors.password2 = 'Please Confirm Password';
            }
            return errors;
        }}
        onSubmit={values => {
            if (values.username && values.first_name && values.last_name && values.email && values.password && values.password2) {
                console.log('form submitted!!')
            }
        }}>

        {(props) => (
            <Form>
                <InputNumberField props={props} >


                <Button type="submit" onClick={handleSubmit}>
                    Register
                </Button>
            </Form>
        )}
    </Formik>
);

export default Register;