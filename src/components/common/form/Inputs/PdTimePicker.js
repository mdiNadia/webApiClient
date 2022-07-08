// import React, { useState, useEffect } from "react";
// // import moment from "moment";
// // import DateFnsUtils from "@date-io/date-fns";
// import JalaliUtils from "@date-io/jalaali";
// import {
//   // DatePicker,
//   TimePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
// import jMoment from "moment-jalaali";

// jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

// const PdTimePicker = ({ selectedDate, handleDateChange, readOnly }) => {
//   const [selectedDate, handleDateChange] = useState(tempTime);

//   useEffect(() => {
//     // if (selectedDate && selectedDate._d) {
//     //   handleDateChange(selectedDate._d);
//     //   // console.log(selectedDate._d);
//     // }
//     handleDateChange(selectedDate._d);

//   }, [selectedDate]);

//   return (
//     <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
//       <TimePicker
//         okLabel="تأیید"
//         cancelLabel="لغو"
//         ampm={false}
//         labelFunc={(date) => (date ? date.format("yyyy:MM:dd HH:mm") : "")}
//         value={selectedDate}
//         onChange={handleDateChange}
//         showTodayButton
//         todayLabel="زمان فعلی"
//         className="timepicker-aqua-color"
//         disabled={readOnly}
//       />
//     </MuiPickersUtilsProvider>
//   );
// };

// export default PdTimePicker;
