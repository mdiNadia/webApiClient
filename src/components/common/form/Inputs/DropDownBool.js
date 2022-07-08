import React from 'react'
import { Form } from 'react-bootstrap';

const DropDownBool = ({ lable, value, setValue, options, nogroup }) => {
    
    return (
        nogroup ? <Form.Control
            as="select"
            value={value ? "true" : "false"}
            onChange={e => setValue(e.target.value == "true" ? true : false)}
        >
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
        </Form.Control> :
            <Form.Group >
                <Form.Label>{lable}</Form.Label>
                <Form.Control
                    as="select"
                    value={value ? "true" : "false"}
                    onChange={e => setValue(e.target.value == "true" ? true : false)}
                >
                    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
                </Form.Control>
            </Form.Group>


    )
}

export default DropDownBool;