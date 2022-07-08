import React from 'react';
import {Button}  from 'react-bootstrap'


const ChangetStateButton = ({ lable, size, variant, btnClass, onClick }) => {

    return (
            <Button onClick={onClick} size={size} variant={variant} className={btnClass}  >
                {lable}
            </Button>
    );
}
export default ChangetStateButton;