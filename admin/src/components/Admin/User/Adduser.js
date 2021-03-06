
import React from 'react'
import { Modal } from 'semantic-ui-react'
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const AddModal = ({ modalAddIsOpen, closeModalAdd }) => {
    

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                <Container>
                    <Row style={{ margin: 5 }}>
                        <Col xs={4}> <label htmlFor={props.id || props.name}>{label}</label></Col>
                        <Col xs={4}> <input className="text-input" {...field} {...props} /></Col>

                    </Row>
                    <Row>  {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
                    </Row>
                </Container>



            </>
        );
    };


        return (

            <Modal
                open={modalAddIsOpen}
                onRequestClose={closeModalAdd}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 >ADD USER</h2>

                <Formik
                    initialValues={{
                        userName: '',
                        passWord: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        phone: ''


                    }}
                    validationSchema={Yup.object({
                        userName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        passWord: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),

                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),

                        firstName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        lastName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        phone: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),

                    })}
                    onSubmit={(values, { setSubmitting }) => {

                    }}
                >
                    <Form >

                        <div style={{ margin: 10 }}>
                            <MyTextInput
                                label="Username"
                                name="userName"
                                type="text"
                            />
                        </div>

                        <div style={{ margin: 10 }}>
                            <MyTextInput
                                label="Password"
                                name="passWord"
                                type="passWord"
                            />
                        </div>
                        <div style={{ margin: 10 }}>
                            <MyTextInput
                                label="Email "
                                name="email"
                                type="email"

                            />
                        </div>

                        <div style={{ margin: 10 }}>
                            <MyTextInput
                                label="First Name"
                                name="firstName"
                                type="text"

                            />
                        </div>

                        <div style={{ margin: 10 }}>
                            <MyTextInput
                                label="Last Name"
                                name="lastName"
                                type="text"

                            />
                        </div>
                        <div style={{ margin: 10 }}>
                            <MyTextInput
                                label="Phone"
                                name="phone"
                                type="phone"

                            />
                        </div>


                        <div style={{ margin: 10 }}>
                            <button type="submit" >Update</button>

                        </div>

                    </Form>
                </Formik>

                <button onClick={closeModalAdd}>close</button>
            </Modal>
        )
}
export default AddModal;

