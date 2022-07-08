import React, { useState, useEffect } from 'react'
import { RangeDatePicker, DatePicker } from "jalali-react-datepicker";



const PickDateTime = ({ lable, date, setdate }) => {
    
    return (
        <div className="form-group">
            <label> {lable} </label>
            <DatePicker
                className="form-control"
                value={date}
                onClickSubmitButton={({value}) => {
                    var date = new Date(value._d);
                     setdate(date.toISOString());
                }}
                timePicker={true}
            />



        </div>
    )
}
export default PickDateTime;

