import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ListPatients = ({ patients, onClickItemPatient, refs, indexClickedMaker }) => {
    if (patients.length === 0) {
        return (<div>HIỆN CHƯA CÓ BÃI XE TẠI ĐÂY</div>)
    }
    else {
        return <ListGroup className="list-group" as="ul">
            {patients && patients.map((patient, index) => {
                return (
                    <ListGroup.Item key={index} as="li" ref={refs[index]} onClick={() => {
                        onClickItemPatient(patient, index);
                    }} active={index === indexClickedMaker ? true : false}><ul>
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