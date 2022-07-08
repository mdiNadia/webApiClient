import React, { useState , useEffect} from 'react'
import { RangeDatePicker } from "jalali-react-datepicker";


export default function ({
    lable
    ,fromDate
    , setFromDate
    , toDate
    , setToDate }) {


        useEffect(() => {
            console.log("fromDate", fromDate)
            console.log("toDate", toDate)
        }, [fromDate])
     
    return (
        <div className="form-group">
            <label> {lable} </label>

            <RangeDatePicker
                className="form-control"
                fromLabel={"شروع از"}
                toLabel="تا"
                start={fromDate}
                end={toDate}
                onClickSubmitButton={({ start, end }) => {
                    setFromDate(start._i.replace("-//", ""));
                    setToDate(end._i.replace("-//", ""));

                    console.log("start ", start._i.replace("-//", ""));
                    console.log("end ", end._i.replace("-//", ""));
                }}
                timePicker={true}
            // theme = {theme}
            />



        </div>
    )
}

