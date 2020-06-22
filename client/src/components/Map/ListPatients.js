import React from 'react';
import { ListGroup } from 'react-bootstrap';
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick'
// import custom algorithm common
import algorithm from '../../algorithm'
//

const ListPatients = ({ patients, onClickItemPatient, refs, indexClickedMaker, currentPatient }) => {
    // check Switch ListPa and PatientInfo FALSE LIST  | TRUE LA PATIENTINFOR
    const abc = React.useContext(SetClick)
    //
    //
    if (patients.length === 0) {
        return (<div style={{ color: "yellow" }}>HIỆN CHƯA CÓ BÃI XE TẠI ĐÂY</div>)
    }
    else {
        return <ListGroup className="list-group" as="ul">
            {patients && patients.map((patient, index) => {
                return (
                    <ListGroup.Item key={index} as="li" ref={refs[index]} onClick={() => {
                        onClickItemPatient(patient, index);
                        abc.setswitchLP({ LiPa: true, BinhLuan: false })
                    }} active={((index === algorithm.customizedIndexOf(currentPatient, patients)) && (algorithm.customizedIndexOf(currentPatient, patients) !== -1)) ? true : false}><ul>
                            <li>ID:  {patient.getId()}</li>
                            <li>AVAILABLESLOT:  {patient.getAvailableslot()}</li>
                            <li>TOTALSLOT:  {patient.getTotalslot()}</li>
                        </ul>
                    </ListGroup.Item>
                )
            })
            }
        </ListGroup>
    }

}

export default ListPatients; 