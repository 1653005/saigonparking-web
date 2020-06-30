import React from 'react'

import Cookies from 'js-cookie'

import { UserServiceClient } from '../api/Actor_grpc_web_pb';
import UserProto from '../api/Actor_pb';

import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {


    Redirect
} from "react-router-dom";
import { API_URL } from '../saigonparking';
import AuthApi from "./Auth/AuthAPI";

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
//modal Error
import ModalError from './Modal/ModalError'
import exceptionHandler from '../ExceptionHandling'
//Kiem tra va xuly loi Error00001
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import sessionstorage from 'sessionstorage'
const authService = new AuthServiceClient(API_URL)
//
const userService = new UserServiceClient(API_URL)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;

const Resetpassword = ({ username }) => {
    //config notification
    const createNotification = (type, errortype) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('ĐÃ CẬP NHẬT MẬT KHẨU CHO  ' + errortype, 'CẬP NHẬT MẬT KHẨU THÀNH CÔNG');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                if (errortype === 'SPE#00009') {
                    console.log(errortype)
                    NotificationManager.error("USERNAME HOẶC EMAIL ĐÃ TỒN TẠI", 'Error!', 5000, () => {
                        alert('callback');
                    });


                }
                break;
        }

    };

    //config modal Error
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    //
    const [nextpage, setnextpage] = React.useState(false)
    //
    //xử lý lỗi error0001 cấp accestoken mới
    const [flat, setflat] = React.useState(false)
    const xulyerrorSPE00001 = () => {
        const refreshtoken = Cookies.get('refreshtoken')
        const token = 'Bearer ' + refreshtoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()

        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                if (err.message === 'SPE#00001') {
                    Cookies.remove("checkUserName");
                    Cookies.remove("token");

                    Cookies.remove("refreshtoken");

                    sessionstorage.clear()
                }


            } else {

                if (res.getRefreshtoken() === '') {
                    /** luu access token */
                    Cookies.set("token", res.getAccesstoken())
                    console.log("accesstoken mới")
                    setflat(!flat)

                } else {
                    /** luu new access token + new refresh token */
                    Cookies.set("token", res.getAccesstoken())
                    Cookies.set("refreshtoken", res.getRefreshtoken())
                }


            }
        })

    }
    //

    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {

        Auth.setAuth(false)
        Auth.setforgetpass(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");

        Cookies.remove("refreshtoken");

        sessionstorage.clear();
    }

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div style={{color: "#ef4300" }} className="error">{meta.error}</div>
                ) : null}
            </>
        );
    };

    if (nextpage === true) {
        return (<Redirect to="/profile" />)
    }


    return (
        <div className="page-container2">
        <div>
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
            <Formik 
                initialValues={{

                    passWord: '',
                    confirmpassWord: '',

                }}
                validationSchema ={Yup.object({
                    
                    passWord: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    confirmpassWord: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required')
                        .oneOf([Yup.ref('passWord'), null], 'Passwords must match'),


                })}
                onSubmit={(values, { setSubmitting }) => {


                    // console.log(values.passWord)


                    const token = 'Bearer ' + Cookies.get("token");
                    const metadata = { 'Authorization': token }
                    const request = new UserProto.UpdatePasswordRequest()

                    request.setUsername(Cookies.get("checkUserName"))
                    request.setNewpassword(values.passWord)

                    userService.updatePassword(request, metadata, (err, res) => {

                        if (err) {

                            if (err.message === 'SPE#00001') {
                                xulyerrorSPE00001()
                            }
                            else {
                                setmyError(err.message)
                                openModalError()
                            }
                        } else {

                            // console.log("Reset Password thanh cong")
                            // console.log(res)

                            createNotification('success', Cookies.get("checkUserName"))
                            setnextpage(true)
                            setSubmitting(false);


                        }

                    })


                }}
            >
                <formResetPass className="formResetPass" >

                <div className='divForm' >
                    <h1>Đổi mật khẩu</h1>
                    <div  >
                        <MyTextInput
                            label="Mật khẩu"
                            name="passWord"
                            type="passWord"
                        />
                    </div>

                    <div >
                        <MyTextInput
                            label="Xác nhận mật khẩu"
                            name="confirmpassWord"
                            type="passWord"
                        />
                    </div>
                    <button type="submit" >Cập nhật</button>
</div>
                </formResetPass>
            </Formik>
            <NotificationContainer />
        </div>
        </div>
    )

}

export default Resetpassword
