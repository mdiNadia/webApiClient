import React, { useState, useEffect } from 'react'
import { RangeDatePicker, DatePicker } from "jalali-react-datepicker";



const RawPickDateTime = ({ date, setdate }) => {

    return (
        <DatePicker
            className="form-control"
            value={date?? new Date()}
            onClickSubmitButton={({ value }) => {
            
                var d = value._d
                var date = new Date(value._d);
                var a = date.toISOString();
                var s = date.toISOString().split("T")[0];
                
                setdate(date.toISOString());
            }}
            timePicker={true}
        />
    )
}
export default RawPickDateTime;

