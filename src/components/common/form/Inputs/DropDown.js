import React from 'react'
import { Form } from 'react-bootstrap';

const DropDown = ({ lable, value, setValue, options }) => {
    return lable ? (

        <Form.Group >
            <Form.Label>{lable}</Form.Label>
            <Form.Control
                as="select"
                value={value}
                onChange={e => {
                    
                    setValue(e.target.value);
                }}
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
            </Form.Control>
        </Form.Group >


    ) :
        (


            <Form.Control
                as="select"
                value={value}
                onChange={e => setValue(e.target.value)}
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
            </Form.Control>


        )
}

export default DropDown;