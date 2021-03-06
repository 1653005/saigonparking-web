import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from "./Auth/AuthAPI";

import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'

import { AuthServiceClient } from '../api/Auth_grpc_web_pb';


import { Redirect } from "react-router-dom";
import  { API_URL } from '../saigonparking';
//modal Error 

import ModalActivateAccountError from './ActivateAccount/ModalActivateAccountError'



const authService = new AuthServiceClient(API_URL)



const Forgetpassword = () => {
    //config Error modal
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError,setmyError] = React.useState(null)
    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    //
    const Auth = React.useContext(AuthApi)
    const [sendemail, setsendemail] = React.useState(true)
    const callResetPassword = (username, Auth) => {
        const request = new StringValue()
        const metadata = {};
        request.setValue(username)
        authService.sendResetPasswordEmail(request, metadata, (err, res) => {
            if (err) {
                setmyError(err.message)
                openModalError()
            } else {
                setsendemail(false)
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            userName: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            callResetPassword(values.userName, Auth)
        },
    });

    return (
        <>{
            (sendemail === true)?(
                <form onSubmit={formik.handleSubmit}>
                    <div style={{ margin: 10 }}>
                    {modalErrorIsOpen?<ModalActivateAccountError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />:null}
                        <label htmlFor="userName">USERNAME</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div>{formik.errors.userName}</div>
                        ) : null}
                    </div>
                    <div style={{ margin: 10 }}>
                        <button style={{ margin: 10 }} type="submit" >Submit</button>
                    </div>
                </form>
            ):
            (<Redirect to="/" />)
        }
        </>
    );
};
export default Forgetpassword;
