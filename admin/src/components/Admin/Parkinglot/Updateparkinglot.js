
import React, { useEffect } from 'react'
import Card from "react-bootstrap/Card";
import Modal from 'react-modal';
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
//
import '../../../css/formparkinguser.css'
import '../../../css/modal.css';

import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import parkingLotMapper from '../../../mapper/ParkingLotMapper';
//Modal Error
import ModalError from '../../Modal/ModalError'
import exceptionHandler from '../../../ExceptionHandling'

//star
//star
import StarRatings from "react-star-ratings";
//image
import defaultimageparkinglot from './images/plot.jpg'
//

const ParkinglotwebService = new ParkingLotServiceClient(API_URL)

Modal.setAppElement(document.getElementById("root"));
const UpdateModal = ({ modalIsOpen, closeModal, parkinglot }) => {
    //config Modal Error

    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    //
    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                <Container>
                    <Row style={{ margin: 5 }}>
                        <Col xs={4}> <label htmlFor={props.id || props.name}>{label}</label></Col>
                        <Col xs={4}> <input className="inputparkinglotuser" {...field} {...props} /></Col>

                    </Row>
                    <Row>  {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
                    </Row>
                </Container>



            </>
        );
    };

    const [IsParking, setIsParking] = React.useState(null)







    useEffect(() => {
        
        if (modalIsOpen === true) {
            //getParking


            const request = new Int64Value();
            const token = 'Bearer ' + Cookies.get("token");
            request.setValue(parkinglot.getId())
            const metadata = { 'Authorization': token }

            ParkinglotwebService.getParkingLotById(request, metadata, (err, res) => {
                if (err) {

                    console.log(err.message)
                    if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                        setmyError('SPE#0000DB')
                    }
                    else {
                        setmyError(err.message)
                    }


                    openModalError()

                } else {

                    setIsParking(res)
                }
            })




        }

        return () => {


            setIsParking(null)



        }
    }, [modalIsOpen, parkinglot, modalErrorIsOpen])


    if (modalErrorIsOpen === true) {
        return (
            <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />
        )
    }
    if (parkinglot != null) {


        return (

            <Modal
                isOpen={modalIsOpen}

                onRequestClose={() => {

                    closeModal()

                }}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >

                {IsParking ? <Card >

                    <Card.Body>
                        <Card.Title>ID: {IsParking.getId()}</Card.Title>
                        <Card.Text>
                            <img style={{ width: '88%' }} src={(IsParking.getInformation().getImagedata_asB64()) ? (`data:image/jpeg;base64,${IsParking.getInformation().getImagedata_asB64()}`) : defaultimageparkinglot} />

                            <StarRatings
                                rating={IsParking.getInformation().getRatingaverage()}
                                starRatedColor="rgb(56,112,112)"
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                name="rating"
                            />

                            <li>NAME: {IsParking.getInformation().getName()}</li>
                            <li>ADDRESS: {IsParking.getInformation().getAddress()}</li>
                            <li>PHONE: {IsParking.getInformation().getPhone()}</li>
                            <li>TYPE: {parkingLotMapper.toTypeString(IsParking.getType())}</li>
                            <li>OPEN: {IsParking.getOpeninghour()}</li>
                            <li>CLOSE: {IsParking.getClosinghour()}</li>
                            <li>AVAILABLESLOT: {IsParking.getAvailableslot()}</li>
                            <li>TOTALSLOT: {IsParking.getTotalslot()}</li>


                        </Card.Text>
                    </Card.Body>
                </Card> : null}


                <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
            </Modal>
        )



    }
    else {
        return <div>XẢY RA LỖI KHI LOAD DỮ LIỆU</div>
    }




}
export default UpdateModal;
